angular.module("app", []).controller("CamelCtrl", function CamelCtrl(){
	
	var hash = window.location.hash;
	var cc = this;
	
	/*** INITIALIZATION ***/
	cc.language = (hash.indexOf('/en/') != -1) ? 'en' : 'de';
	
	cc.txt = txt[cc.language];
	cc.result = 0;
	cc.runresult = 0;
	cc.gender = null;

	cc.male = {
		age: 22,
		height: 176,
		haircolor: 5,
		hairlength: 3,
		eyecolor: 4,
		beard: 4,
		body: 3
	};
	
	cc.female = {
		age: 22,
		height: 176,
		haircolor: 5,
		hairlength: 3,
		eyecolor: 4,
		boobs: 4,
		body: 5
	};
	
	cc.hl4 = '';
	cc.hl3 = 'radio-active';
	cc.hl2 = '';
	cc.hl1 = '';

	cc.bl4 = 'radio-active';
	cc.bl3 = '';
	cc.bl2 = '';
	cc.bl1 = '';

	cc.bo4 = 'radio-active';
	cc.bo3 = '';
	cc.bo2 = '';
	cc.bo1 = '';

	cc.bd5 = '';
	cc.bd4 = '';
	cc.bd3 = 'radio-active';
	cc.bd2 = '';
	cc.bd1 = '';

	cc.genderDisplay = 'block';
	cc.maleDisplay   = 'none';
	cc.femaleDisplay = 'none';
	cc.maleResult    = 'none';
	cc.femaleResult  = 'none';
	
	cc.genderSelection = function(){
		if(cc.gender === 'male'){
			txt.de.headline  = txt.de.headm;
			txt.en.headline  = txt.en.headm;
			cc.maleDisplay   = 'block';
			cc.femaleDisplay = 'none';			
		} else {
			txt.de.headline  = txt.de.headf;
			txt.en.headline  = txt.en.headf;
			cc.maleDisplay   = 'none';
			cc.femaleDisplay = 'block';
		}
		cc.setHash();
		cc.genderDisplay = 'none';		
		$('#'+cc.gender).addClass('fadein-section');

		cc.updateSelection();
	}
	
	cc.setHash = function(){
		var hash = '#/'+cc.language+'/';
		hash += (cc.gender !== null) ? cc.gender + '/' : '';
		window.location.hash = hash;
	}
	
	cc.languageSelection = function(lang){
		cc.language = lang;
		cc.setHash();
		cc.txt = txt[cc.language];
		document.title = cc.txt.title;
	}
	
	cc.updateSelection = function(){
		if(cc.gender === 'male'){
			cc.result = parseInt((cc[cc.gender].height-139)/10) + parseInt((100-cc[cc.gender].age)/4) + parseInt(cc[cc.gender].haircolor) + cc[cc.gender].hairlength + cc[cc.gender].eyecolor + parseInt(cc[cc.gender].body) + cc[cc.gender].beard;
		} else {
			cc.result = parseInt((cc[cc.gender].height-139)/10) + parseInt((100-cc[cc.gender].age)/4) + parseInt(cc[cc.gender].haircolor) + cc[cc.gender].hairlength + cc[cc.gender].eyecolor + parseInt(cc[cc.gender].body) + cc[cc.gender].boobs;
		}
		/*console.log(cc.result);*/
	}
	
	cc.hairlengthSelection = function(){
		cc.hl4 = '';
		cc.hl3 = '';
		cc.hl2 = '';
		cc.hl1 = '';
		cc['hl'+cc[cc.gender].hairlength] = 'radio-active';
		cc[cc.gender].hairlength = parseInt(cc[cc.gender].hairlength);
		cc.updateSelection();
	}

	cc.eyecolorSelection = function(){
		cc[cc.gender].eyecolor = parseInt(cc[cc.gender].eyecolor);
		cc.updateSelection();
	}

	cc.beardSelection = function(){
		cc.bl4 = '';
		cc.bl3 = '';
		cc.bl2 = '';
		cc.bl1 = '';
		cc['bl'+cc[cc.gender].beard] = 'radio-active';
		cc[cc.gender].beard = parseInt(cc[cc.gender].beard);
		cc.updateSelection();
	}

	cc.boobsSelection = function(){
		cc.bo4 = '';
		cc.bo3 = '';
		cc.bo2 = '';
		cc.bo1 = '';
		cc['bo'+cc[cc.gender].boobs] = 'radio-active';
		cc[cc.gender].boobs = parseInt(cc[cc.gender].boobs);
		cc.updateSelection();
	}

	cc.bodySelection = function(){
		cc.bd5 = '';
		cc.bd4 = '';
		cc.bd3 = '';
		cc.bd2 = '';
		cc.bd1 = '';
		cc['bd'+cc[cc.gender].body] = 'radio-active';
		cc[cc.gender].body = parseInt(cc[cc.gender].body);
		cc.updateSelection();
	}
	
	cc.calculate = function(){
		console.log(cc.result);
		$('#'+cc.gender).css({display:'none'});
		if(cc.gender === 'male'){ cc.maleResult = 'block';} 
		else { cc.femaleResult = 'block';}
		$('#result-'+cc.gender).addClass('fadein-section');
		window.setTimeout(cc.showResult,500);
	}
	
	cc.showResult = function(){
		$('#run-'+cc.gender+'-result').html(cc.runresult);
		if(cc.runresult < cc. result){
			cc.runresult++;
			window.setTimeout(cc.showResult,(50+cc.runresult));
		}
	}
	
	cc.again = function(){
		window.location.hash = '';
		window.location.reload();
	}
	
	if(hash.indexOf('/male/')   != -1){ cc.gender = 'male';   cc.genderSelection(); }
	if(hash.indexOf('/female/') != -1){ cc.gender = 'female'; cc.genderSelection(); }

});

$(function(){
	/*** removal of first empty select option ***/
	if($('.select-male-haircolor option').length === 6){ $('.select-male-haircolor option').first().remove(); };
	if($('.select-female-haircolor option').length === 6){ $('.select-female-haircolor option').first().remove(); };
	if($('.select-female-body option').length === 6){ $('.select-female-body option').first().remove(); };
});
