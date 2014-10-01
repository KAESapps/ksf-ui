define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'ksf-ui/layout/Single',
	'ksf-ui/layout/Flow',
	'ksf-ui/widget/base/Button',
	'ksf-ui/widget/Button',
	'ksf/utils/destroy',
	'./breadcrumbsStyle',
	'./crumbStyle'
], function(
	compose,
	_Composite,
	SingleLayout,
	FlowLayout,
	BaseButton,
	Button,
	destroy,
	breadcrumbsStyle,
	crumbStyle
){
	var Crumb = compose(function(page, onAction) {
		var btn;
		if (page.title.value) {
			btn = new Button(page.title);
		} else {
			btn = new BaseButton(page.title);
		}
		this.domNode = btn.domNode;
		crumbStyle.apply(this.domNode);
		btn.onAction(onAction);
	}, {
		active: function(active) {
			if (active) {
				crumbStyle.applyState(this.domNode, 'active');
			} else {
				crumbStyle.unapplyState(this.domNode, 'active');
			}
		}
	});
	return compose(_Composite, {
		_rootFactory: function() {
			return new FlowLayout();
		}
	}, function(page) {
		this._history = [];
		this._breadcrumbs = [];

		this._mainContainer = new SingleLayout();
		this._breadcrumbsContainer = new FlowLayout();
		breadcrumbsStyle.apply(this._breadcrumbsContainer.domNode);

		this._root.content([
			this._breadcrumbsContainer,
			this._mainContainer
		]);

		this._addPage(page);
		this.active(page);
	}, {
		active: function(page) {
			destroy(this._activeCancelers);

			var view = page.view();
			this._mainContainer.content(view);

			var crumb = this._breadcrumbs[this._history.indexOf(page)];
			// highlight crumb
			crumb.active(true);

			var self = this;
			this._activeCancelers = [
				view.onNext && view.onNext(function(options) {
					self.next(page, options.page, options);
				}),
				view.onPrevious && view.onPrevious(function(options) {
					self.previous(page, options);
				}),
				view,	// destroy the view
				function() { crumb.active(false); }	// unhighlight crumb
			];
		},

		_addPage: function(page) {
			this._history.push(page);
			var self = this;
			// TODO: à faire dans un container avec factory
			var crumb = new Crumb(page, function() {
				self.active(page);
			});
			this._breadcrumbs.push(crumb);
			this._breadcrumbsContainer.add(crumb);
		},

		next: function(fromPage, nextPage, options) {
			var currentIndex = this._history.indexOf(fromPage);

			if (options && options.removeSelf) {
				this._eraseHistoryFrom(currentIndex);
			} else {
				this._eraseHistoryFrom(currentIndex + 1);
			}

			this._addPage(nextPage);
			this.active(nextPage);
		},

		previous: function(fromPage, options) {
			var currentIndex = this._history.indexOf(fromPage);
			if (currentIndex > 0) {
				if (options && options.removeSelf) {
					this._eraseHistoryFrom(currentIndex);
				}
				this.active(this._history[currentIndex - 1]);
			}
		},

		_eraseHistoryFrom: function(fromIndex) {
			for (var i = fromIndex; i < this._history.length; i++) {
				destroy(this._breadcrumbs[i]);
				this._breadcrumbsContainer.remove(this._breadcrumbs[i]);
			}
			this._history = this._history.slice(0, fromIndex);
			this._breadcrumbs = this._breadcrumbs.slice(0, fromIndex);
		},
	});
});