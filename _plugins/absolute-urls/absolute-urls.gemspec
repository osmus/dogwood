# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "absolute-urls"
  spec.version       = "0.1.0"
  spec.authors       = ["Quincy Morgan"]
  spec.email         = ["2046746+quincylvania@users.noreply.github.com"]

  spec.summary       = "Force absolute URLs in Jekyll Kramdown `href` and `src` properties."
  spec.homepage      = "https://github.com/osmus/dogwood"
  spec.license       = "MIT"

  spec.files         = Dir["lib/**/*"]

  spec.add_runtime_dependency "jekyll", "~> 4.3"
end
