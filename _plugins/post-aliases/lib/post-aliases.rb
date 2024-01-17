# This plugin generates redirect pages for all posts, pointing from the /:year/:month/:title
# format to the actual URL, whatever it may be. This makes the site backwards-compatible
# for links to pre-2023-redesign blog posts. It could have other uses as well, like URL-shortening.
#
# Example:
# /2023/02/tasking-manager-redesign
#               --> automatically redirects to -->
# /news/2023/02/tasking-manager-redesign

module RedirectPosts
    class RedirectPostsGenerator < Jekyll::Generator
      safe true
  
      def generate(site)
        site.posts.docs.each do |post|
          site.pages << PostRedirectPage.new(site, post)
        end
      end
    end
end

class PostRedirectPage < Jekyll::Page
    def initialize(site, post)
      @site = site             # the current site instance.
      @base = site.source      # path to the source directory.

      @basename = post.basename      # filename without the extension.
      @ext      = post.data["ext"]      # the extension.
      @name     = post.basename + post.data["ext"] # basically @basename + @ext.

      @data = {}
      
      data["layout"] = "redirect"
      data["redirect"] = post.url
      data["permalink"] = post.date.strftime('/%Y/%m/') + post.data["slug"] + "/"

    end
end