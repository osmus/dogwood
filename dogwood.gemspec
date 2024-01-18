# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "osmus-dogwood"
  spec.version       = "0.1.0"
  spec.authors       = ["Quincy Morgan"]
  spec.email         = ["2046746+quincylvania@users.noreply.github.com"]

  spec.summary       = "The Jekyll theme powering openstreetmap.us"
  spec.homepage      = "https://github.com/osmus/dogwood"
  spec.license       = "MIT"

  spec.files = `git ls-files -z`.split("\x0").select do|f|
    f.match(%r!^((assets|_includes|_plugins|_layouts|_sass)/|_config.yml|index.html|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.3"

  spec.add_runtime_dependency "jekyll-archives", "~> 2.2.1"
  spec.add_runtime_dependency 'jekyll-include-cache', "~> 0.2.1"

  spec.add_runtime_dependency "absolute-urls"
  spec.add_runtime_dependency "post-aliases"
  spec.add_runtime_dependency "unwrap-img"
end
