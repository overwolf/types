// No-op custom plugin to avoid Typedoc load error when custom plugin absent
function load(app) {
  // Typedoc will call this with the Application instance. Keep it intentionally empty.
}

module.exports = { load };
module.exports.default = module.exports;
