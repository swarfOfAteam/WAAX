!function(WX){"use strict";function StereoDelay(preset){WX.PlugIn.defineType(this,"Processor"),this._lDelay=WX.Delay(),this._rDelay=WX.Delay(),this._lFeedback=WX.Gain(),this._rFeedback=WX.Gain(),this._lXtalk=WX.Gain(),this._rXtalk=WX.Gain(),this._dry=WX.Gain(),this._wet=WX.Gain();var _splitter=WX.Splitter(2),_merger=WX.Merger(2);this._input.to(_splitter,this._dry),_splitter.connect(this._lDelay,0),this._lDelay.to(this._lFeedback),this._lFeedback.to(this._lDelay,this._rXtalk),this._lXtalk.to(this._lDelay),this._lDelay.connect(_merger,0,0),_splitter.connect(this._rDelay,0),this._rDelay.to(this._rFeedback),this._rFeedback.to(this._rDelay,this._lXtalk),this._rXtalk.to(this._rDelay),this._rDelay.connect(_merger,0,1),_merger.to(this._wet),this._dry.to(this._output),this._wet.to(this._output),WX.defineParams(this,{delayTimeLeft:{type:"Generic",name:"L Delay","default":.125,min:.025,max:5,unit:"Seconds"},delayTimeRight:{type:"Generic",name:"R Delay","default":.25,min:.025,max:5,unit:"Seconds"},feedbackLeft:{type:"Generic",name:"L FB","default":.25,min:0,max:1},feedbackRight:{type:"Generic",name:"R FB","default":.125,min:0,max:1},crosstalk:{type:"Generic",name:"Crosstalk","default":.1,min:0,max:1},mix:{type:"Generic",name:"Mix","default":.2,min:0,max:1}}),WX.PlugIn.initPreset(this,preset)}StereoDelay.prototype={info:{name:"StereoDelay",version:"0.0.3",api_version:"1.0.0-alpha",author:"Hongchan Choi",type:"Processor",description:"Pingpong Delay with Feedback Control"},defaultPreset:{delayTimeLeft:.125,delayTimeRight:.25,feedbackLeft:.25,feedbackRight:.125,crosstalk:.1,mix:.2},$delayTimeLeft:function(value,time,rampType){this._lDelay.delayTime.set(value,time,rampType)},$delayTimeRight:function(value,time,rampType){this._rDelay.delayTime.set(value,time,rampType)},$feedbackLeft:function(value,time,rampType){this._lFeedback.gain.set(value,time,rampType)},$feedbackRight:function(value,time,rampType){this._rFeedback.gain.set(value,time,rampType)},$crosstalk:function(value,time,rampType){this._lXtalk.gain.set(value,time,rampType),this._rXtalk.gain.set(value,time,rampType)},$mix:function(value,time,rampType){this._dry.gain.set(1-value,time,rampType),this._wet.gain.set(value,time,rampType)}},WX.PlugIn.extendPrototype(StereoDelay,"Processor"),WX.PlugIn.register(StereoDelay)}(WX);