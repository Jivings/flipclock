(function($) {
	
	$.widget( "jiv.flipclock", {
 
    // These options will be used as defaults
    options: { 
      clear: null
    },
 
    // Set up the widget
    _create: function() {
      this.time = {
        s: 0,
        m: 0,
        h: 0
      };

      this.$timer = $('<div class="time"></div>');
      var $gap = $('<div class="gap">:</div>');

    	$hours = $('<div class="hours flip"></div>')
    		.appendTo(this.$timer);
      $gap.clone().appendTo(this.$timer);
    	$mins = $('<div class="minutes flip"></div>')
    		.appendTo(this.$timer);
      $gap.clone().appendTo(this.$timer);
    	$secs = $('<div class="seconds flip"></div>')
    		.appendTo(this.$timer);

      this.$time = {
        s : $secs,
        m : $mins,
        h : $hours
      };

    	this.$timer.appendTo(this.element);

    	var updateClock = this.updateTime.bind(this);
    	this.timer = setInterval(updateClock, 500);

    },

  flip: function($el, newValue) {
    $el.text(newValue);
    // flip

  },

 	updateTime: function() {
		var d, s, m, h;
    d = new Date();
    var t = {
      s : d.getSeconds(),
      m : d.getMinutes(),
      h : d.getHours()
    }

    var _this = this;
    $.each(this.time, function(k, v) {
      if(t[k] !== v) {
        // flip the clock
        var val = t[k];
        val = val < 10 ? '0'.concat(val) : val;
        _this.flip(_this.$time[k], val);
        _this.time[k] = val;
      }
    })
		
 	},
    // Use the _setOption method to respond to changes to options
    _setOption: function( key, value ) {
      switch( key ) {
        case "clear":
          // handle changes to clear option
          break;
      }
 
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      $.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super( "_setOption", key, value );
    },
 
    // Use the destroy method to clean up any modifications your widget has made to the DOM
    destroy: function() {
      // In jQuery UI 1.8, you must invoke the destroy method from the base widget
      $.Widget.prototype.destroy.call( this );
      // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
    }
  });
})(jQuery)