# This plugin unwrap <img> elements wrapped in <p> elements, and adds an 'img-container'
# class to <a> elements that wrap <img> elements. This allows us to properly style images
# separately from <p>, e.g. to give them different widths.

require 'kramdown/converter/html'

BLANK_RE = /\A[[:space:]]*\z/

module StandaloneImages
  def isImageElement(ele)
    return ele.type == :img || (ele.type == :html_element && ele.value == "img")
  end
  def convert_p(el, indent)
    return super unless el.children.any? {|child| isImageElement(child) } || el.children.all? { |child| child.type == :a }
    # remove empty text elements that might be sandwiched between images
    els = el.children.select { |child| child.type != :text || !BLANK_RE.match?(child.value) }
    els = els.map { |child|
      if child.children.size == 1 && isImageElement(child.children.first)
        if child.attr['class'].nil?
          child.attr['class'] = 'img-container'
        else
          child.attr['class'] = child.attr['class'] + ' img-container'
        end 
      end
      convert(child, indent)
    }
    return els.join('')
  end
end

Kramdown::Converter::Html.prepend StandaloneImages