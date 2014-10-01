define([
	'compose',
	'famous/core/Surface'
], function(
	compose,
	Surface
){
	return compose(Surface.prototype, function(cmp, options) {
		Surface.call(this, options);
		this._ksfCmp = cmp;
		this._ksfBounds = {};
	}, {
		setup: function(context) {
			Surface.prototype.setup.apply(this, arguments);
			this._contentDirty = false;
		},
		commit: function(context) {
			var self = this;
			var container = context.allocator.container;
			context.allocator = {
				allocate: function() {
					container.appendChild(self._ksfCmp.domNode);
					return self._ksfCmp.domNode;
				}
			};
			
			var ksfBounds = {
				width: this.size && this.size[0] === true ? null : context.size[0],
				height: this.size && this.size[1] === true ? null : context.size[1]
			};
			if (this._ksfBounds.width !== ksfBounds.width || this._ksfBounds.height !== ksfBounds.height) {
				this._ksfCmp.bounds(ksfBounds);
				this._ksfBounds = ksfBounds;
			}


			Surface.prototype.commit.apply(this, arguments);
			if (this._ksfCmp.inDom && !this._inDom && document.body.contains(this._ksfCmp.domNode)) {
				this._inDom = true;
				this._ksfCmp.inDom(true);
			}
		}
	});
});