# This plugin ensures all `src` and `href` properties created by markdown parsing
# are absolute links. This solves issues that occur when the baseurl is a subdirectory.

require 'kramdown/utils/html'

SITE_BASEURL = (Jekyll.sites()[0].config['url'] || '') + (Jekyll.sites()[0].config['baseurl'] || '');

module AbsoluteUrls
  def html_attributes(attr)

    return super unless attr['src'] || attr['href']

    if attr['src'] && attr['src'].start_with?("/")
      attr['src'] = SITE_BASEURL + attr['src']
    end

    if attr['href'] && attr['href'].start_with?("/")
      attr['href'] = SITE_BASEURL + attr['href']
    end

    super(attr)
  end
end

Kramdown::Utils::Html.prepend AbsoluteUrls