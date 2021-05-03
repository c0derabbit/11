# Nagyfalat – a travel log

## Adding new blog posts

- Go to [nagyfalat.com/admin/](https://nagyfalat.com/admin/)
- Sign in (you can do it with GitHub)

### To create a blog post
- On the sidebar, click ‘blog’
- **Navigate to /hu/ or /en/** as wished
- Create new > blog.
- When the popup asks “What type of content are you creating?”, select ‘blog post’ from the dropdown.


#### Creating a blogpost with the make command

There is a `make` command that creates the blog template for you both in the English and the Hungarian namespace. 

For instance:

```
make post date="2021-05-01" loc="Cairngorms" title="Crossing the Cairngorms" org="Scottish Mountain Rescue" orglink="https://www.scottishmountainrescue.org/"  orgdescription="Scottish Mountain Rescue is the community of 25 member Mountain
```

### Blog post editor
To switch between markdown and wysiwyg, click the three dots in the top right corner (next to the Save button).

### To upload photos
- On the sidebar, click ‘Media’
- In the top right corner, click ‘Upload’
- Select photos and upload. Done. Now you can use these in blog posts.

## List of charities we can support

> If you have one to add, just edit this readme.

### Europe
- [Scottish Mountain Rescue](https://www.scottishmountainrescue.org/) - Scotland
- [Open Cages](https://opencages.org/) - UK
- [InDaHouse](https://indahousehungary.hu/) - Hungary
- [ClimeWorks](https://www.climeworks.com/) - Iceland

### World
- [Skateistan](https://www.skateistan.org/) - Afghanistan, Cambodia, South Africa

## Technical

11ty-based blog with js templates, tailwindcss & rollup.

Run `yarn` to install dependencies, and `yarn dev` to run locally.
