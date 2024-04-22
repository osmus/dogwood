---
layout: page
permalink: /
---
<a href="https://github.com/osmus/dogwood"><img src="img/logo.svg" style="border:none;width:100px;"/></a>

# [Dogwood](https://github.com/osmus/dogwood)

Dogwood is the [theme](https://jekyllrb.com/docs/themes/) for the [Jekyll](https://jekyllrb.com) static site generator powering [openstreetmap.us](https://openstreetmap.us). While the content for the OpenStreetMap US website is kept internal to the organization, we've decided to open source the site's theme for the benefit of the community.

Dogwood pushes the envelope of what's possible with static site generators. It supports complex sites with thousands of interconnected, customizable pages, each with their own requirements. For example, you can make a page for a person that links to and from posts they've written, event they've spoken at, and projects they're a part of.

Dogwood is under active development and is not currently versioned. Breaking changes may occur without notice, so we recommend targeting a specific commit of the project of simply forking it.

The Dogwood theme is named for Virginia's state flower, since the OpenStreetMap US [website redesign](https://openstreetmap.us/news/2023/06/website-redesign/) was announced onstage at [State of the Map US 2023](https://openstreetmap.us/events/state-of-the-map-us/2023) in Richmond, Virginia.

## Installation

Dogwood is not distributed as a Ruby gem at this time. However, can still use Dogwood as a theme for your Jekyll site.

Open your terminal and `cd` into the repo's directory. Add Dogwood as a submodule:

```
$ git submodule add https://github.com/osmus/dogwood.git
```

This will clone the theme repo into a `dogwood` folder and also add a .gitmodules file:

```
[submodule "dogwood"]
	path = dogwood
	url = https://github.com/osmus/dogwood.git
```

Next, add these lines to your Jekyll site's `Gemfile`:

```ruby
# theme
gem "osmus-dogwood", path: "dogwood"

# theme plugins
gem "absolute-urls", path: "./dogwood/_plugins/absolute-urls"
gem "post-aliases", path: "./dogwood/_plugins/post-aliases"
gem "unwrap-img", path: "./dogwood/_plugins/unwrap-img"
```

Add this line to your Jekyll site's `_config.yml`:

```yaml
theme: osmus-dogwood
```

And then execute:

```
$ bundle install
```

If you're already running your dev server you'll need to manually restart it for the config changes to take effect.

## Site structure

Dogwood expects your site to have four types of content, each with its own directory:

- `/_pages`: basic pages
- `/_people`: profile pages for people
- `/_posts`: pages with date and author information
- `/_redirects`: simple redirects to other pages

Jekyll will only process directories starting with underscores if you output them like this in `_config.yml`:

```yaml
collections:
  pages:
    output: true
  people:
    output: true
  posts:
    output: true
  redirects:
    output: true
```

It's helpful to set the default layout for these pages. You can set other default values here if you want, like permalinks:

```yaml
defaults:
  - scope:
      type: "pages"
    values:
      layout: "page"
  - scope:
      type: "people"
    values:
      layout: "person"
  - scope:
      type: "posts"
    values:
      layout: "post"
      permalink: /blog/:year/:month/:title/ # or whatever
  - scope:
      type: "redirects"
    values:
      layout: "redirect"
```

Each type of content has its own set of Jekyll front matter values you can customize. Documentation for supported values can be found on these pages:

- [page](https://github.com/osmus/dogwood/blob/gh-pages/docs/page.md)
- [person](https://github.com/osmus/dogwood/blob/gh-pages/docs/person.md)
- [post](https://github.com/osmus/dogwood/blob/gh-pages/docs/post.md)
- [redirect](https://github.com/osmus/dogwood/blob/gh-pages/docs/redirect.md)

## Get involved

### Code of Conduct
Participation is subject to the [OpenStreetMap US Code of Conduct](https://wiki.openstreetmap.org/wiki/Foundation/Local_Chapters/United_States/Code_of_Conduct_Committee/OSM_US_Code_of_Conduct). Please take a moment to review the CoC prior to contributing, and remember to be nice :)

### Contributing

You can open an [issue](https://github.com/osmus/dogwood/issues) in this repository if you have a question, comment, or idea. Please search existing issues first in case someone else had the same thought. [Pull request](https://github.com/osmus/dogwood/pulls) are public, but we recommend opening or commenting on an issue before writing any code so that we can make sure your work is aligned with the goals of the project.

### Development setup
1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Open your terminal and `cd` into the repo's directory
3. Run `bundle install` to install the Ruby gems
4. Run `bundle exec jekyll serve` (or simply `jekyll serve`) to start the development server
5. Visit [http://localhost:4000](http://localhost:4000) in your browser

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements

* Dogwood was originally designed and developed by [Quincy Morgan](https://github.com/quincylvania) under contract to OpenStreetMap US
* Most icons by [FontAwesome](https://fontawesome.com)
* Thank you to the Jekyll team and to everyone who believes in open software and knowledge
