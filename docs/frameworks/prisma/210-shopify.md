---
title: 'How to use Prisma Postgres with Shopify'
metaTitle: 'How to use Prisma Postgres with Shopify'
description: 'Learn how to use Prisma Postgres with Shopify'
sidebar_label: 'Shopify'
image: '/img/guides/prisma-shopify-cover.png'
completion_time: '25 min'
community_section: true
---

## Introduction

[Shopify](https://www.shopify.com/) is a popular platform for building e-commerce stores. This guide will show you how to connect a Shopify app to a [Prisma Postgres](https://www.prisma.io/postgres) database in order to create internal notes for products.

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Shopify Partner Account](https://www.shopify.com/partners) and a [development store](https://shopify.dev/docs/api/development-stores#create-a-development-store-to-test-your-app)

## 1. Set up your project

:::note
If you do not have the Shopify CLI installed, you can install it with `npm install -g @shopify/cli`.
:::

To start, initialize a new Shopify app using the Shopify CLI:

```terminal
shopify app init
```

During setup, you'll be prompted to customize your app. Don't worry—just follow these recommended options to get started quickly and ensure your app is set up for success:

:::info

- *Get started building your app:* `Build a Remix app (recommended)`
- *For your Remix template, which language do you want:* `JavaScript`
- *App Name:* `prisma-store` *(name cannot contain `shopify`)*

:::

Navigate to the `prisma-store` directory:

```terminal
cd prisma-store
```

## 2. Set up Prisma

Prisma comes pre-installed in your project, but let's take a moment to update it to the latest version. This ensures you have access to the newest features, improvements, and the best possible experience as you build your app.

You will be swapping to a Prisma Postgres database, so delete the `migrations` folder along with the `dev.sqlite` file, inside of the `prisma` directory.

You need to update a few things in the `schema.prisma` file to get it working with Remix and Prisma Postgres.
- Swap to the new `prisma-client` generator.
- Update the provider to `postgresql`.
- Update the url to the new database url.

```prisma file=prisma/schema.prisma
generator client 

datasource db 

model Session 
```

To enable your app to store notes for each product, let's add a new `ProductNote` model to your Prisma schema. 

This model will allow you to save and organize notes linked to individual products in your database through the `productGid` field.

```prisma file=prisma/schema.prisma
generator client 

datasource db 

model Session 

//add-start
model ProductNote 
//add-end
```
Next, Prisma will need to be updated to the latest version. Run:

```terminal
npm install prisma --save-dev && npm install @prisma/client
```

Prisma Postgres allows you to create a new database on the fly, you can create a new database at the same time you initialize your project by adding the `--db` flag:

```terminal
npx prisma init --db
```

Once you've completed the prompts, it's time to access your new database:

1. **Open the [Prisma Console](https://console.prisma.io):**
   - Log in and find your newly created database project.
2. **Set up your database credentials:**
   - In the sidebar, click **Database**, then select **Setup**.
   - Choose **Existing project** and press **Generate database credentials**.
3. **Configure your environment:**
   - Create a new `.env` file in the root of your project.
   - Copy and paste the `DATABASE_URL` you just generated into this file. It should look similar to this:
   ```env
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."
   ```
4. **Apply your database schema:**
   - Run the following command to create your tables and get your database ready:
   ```terminal
   npx prisma migrate dev --name init
   ```

Now, before moving on, let's update your `db.server.ts` file to use the newly generated Prisma client.

```tsx file=app/db.server.ts
//delete-next-line

//add-next-line

if (process.env.NODE_ENV !== "production") 
}

const prisma = global.prismaGlobal ?? new PrismaClient();

```

:::warning
It is recommended to add `app/generated/prisma` to your `.gitignore` file.
:::

## 3. Create your Remix model

To keep your project organized, let's create a new `models/` folder. Inside this folder, add a file named `notes.server.js`. This will be the home for all your note-related logic and make your codebase easier to manage as your app grows.

The `notes.server.js` file will contain two functions:
- `getNotes` - This will get all the notes for a given product.
- `createNote` - This will create a new note for a given product.

Start by importing the Prisma client from `db.server.ts` and creating the `getNotes` function:

```js file=models/notes.server.js
//add-start

  const notes = await prisma.productNote.findMany(,
    orderBy: ,
  });
  return notes;
};
//add-end
```

To enable users to add new notes to your database, let's create a function in `notes.server.js` that uses `prisma.productNote.create`:

```js file=models/notes.server.js

  const notes = await prisma.productNote.findMany(,
    orderBy: ,
  });
  return notes;
};

//add-start

  const newNote = await prisma.productNote.create(,
  });
  return newNote;
};
//add-end
```

## 4. Create your layout route

Before those functions are able to be called, our route needs a layout to sit in. This layout route will feature a button for selecting a product, and will act as the parent for your `ProductNotes` route, keeping your app organized and user-friendly.

### 4.1. Create the ProductNotesLayout component

Start by creating the the folder `routes/app.product-notes.jsx` and adding the `ProductNotesLayout` component inside of it:

```jsx file=app/routes/app.product-notes.jsx
//add-start

  return (
    
  );
}
//add-end
```

Next, create the `selectProduct` function and a `Button` to let the user pick a product:

```jsx file=app/routes/app.product-notes.jsx

//delete-next-line

//add-next-line

  //add-next-line
  const navigate = useNavigate();

  //add-start
  async function selectProduct() );
    const selectedGid = products[0].id;
    navigate(`/app/product-notes/$`);
  }
  //add-end

  return (
    
  );
}
```

Remix renders provides the ability to render a nested route. Add an `` to the `routes/app.product-notes.jsx` file where the `ProductNotes` route will be rendered:

```jsx file=app/routes/app.product-notes.jsx
//delete-next-line

//add-next-line

  const navigate = useNavigate();

  async function selectProduct() );
    const selectedGid = products[0].id;
    navigate(`/app/product-notes/$`);
  }

  return (
    
  );
}
```

### 4.2. Add the ProductNotesLayout to the sidebar

If you run `npm run dev`, you won't be able to see the `Product Notes` route. To fix this, you need to add the `ProductNotesLayout` to the `app.jsx` file so it shows up in the sidebar:

```jsx file=app/routes/app.jsx

  await authenticate.admin(request);

  return ;
};

  const  = useLoaderData();

  return (
    
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.

  return boundary.error(useRouteError());
}

  return boundary.headers(headersArgs);
};
```

## 5. Create your product notes route

Currently, if you run `npm run dev` and navigate to the `Product Notes` route, you will see nothing once selecting a product.

Follow these steps to create the product notes route:

Create a new `routes/app/app.notes.$productGid.jsx` file which will take in the productGid as a parameter, and return the product notes associated with the product as well as a form to create a new note:

```jsx file=app/routes/app/app.notes.$productGid.jsx
//add-start

  return (
    <></>
  );
}
//add-end
```

### 5.1. Render the notes

On load, the route will need to fetch the notes for the product and display them.

Add a `loader` function to the route:

```jsx file=app/routes/app/app.notes.$productGid.jsx
//add-start

//add-end

//add-start

  const  = params;
  const notes = await getNotes(productGid);
  return json();
};
//add-end

  //add-next-line
  const  = useLoaderData();

  return (
    <></>
  );
}
```

Map out the notes in the `ProductNotes` component, using Polaris components:

```jsx file=app/routes/app/app.notes.$productGid.jsx

//add-next-line

  const  = params;
  const notes = await getNotes(productGid);
  return json();
};

  const  = useLoaderData();
  return (
    <>
      //add-start
      <Layout.Section>
        
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
      //add-end
    </>
  );
}
```

You should be seeing "No notes yet.". If so, you're on the right track.

### 5.2. Add the form

A few things need to be added to the route in order to create a new note:
- Add an `action` function to the route.
- Display a `Toast` notification when a note is created.
- Import the `createNote` function from `models/note.server.js`.
- Import the `useActionData` and `useAppBridge`

```jsx file=app/routes/app/app.notes.$productGid.jsx

//delete-next-line

//add-next-line

//delete-next-line

//add-next-line

//add-next-line

  const  = params;
  const notes = await getNotes(productGid);
  return json();
};

//add-start

  const formData = await request.formData();
  const body = formData.get("body")?.toString() || null;
  const  = params;

  await createNote();
  return redirect(`/app/product-notes/$`);
};
//add-end

  const  = useLoaderData();
  //add-start
  const actionData = useActionData();
  const app = useAppBridge();
  //add-end

  //add-start
  useEffect(() => );
      setBody("");
    }
  }, [actionData, app]);
  //add-end

  return (
    <>
      <Layout.Section>
        
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
    </>
  );
}
```

Now, you can build out the form that will call the `action` function:

```jsx file=app/routes/app/app.notes.$productGid.jsx

//delete-next-line

//add-next-line

  const  = params;
  const notes = await getNotes(productGid);
  return json();
};

  const formData = await request.formData();
  const body = formData.get("body")?.toString() || null;
  const  = params;

  await createNote();
  return redirect(`/app/product-notes/$`);
};

  const  = useLoaderData();
  //add-start
  const actionData = useActionData();
  const app = useAppBridge();
  //add-end

  //add-start
  useEffect(() => );
      setBody("");
    }
  }, [actionData, app]);
  //add-end

  return (
    <>
      //add-start
      <Layout.Section>
        
      </Layout.Section>
      //add-end
      <Layout.Section>
        
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
    </>
  );
}
```

You should now be able to add a note to a product and see it displayed.

### 6. Test your route

Run `npm run dev` and navigate to the `Product Notes` route. 
- Navigate to Product Notes on the sidebar
- Select a product
- Add a note
- Verify that notes are displayed and saved correctly.

## Next Steps

Now that you have a working Shopify app connected to a Prisma Postgres database, you can:
- Extend your Prisma schema with more models and relationships
- Add create/update/delete routes and forms
- Enable query caching with [Prisma Postgres](/postgres/database/caching) for better performance

### More Info

- [Prisma Documentation](/orm/overview/introduction)
- [Shopify Dev Documentation](https://shopify.dev/docs)