/* 《 공통 스크립트 》 */

$(document).ready(function(){
	$('.site_menu').length && siteMenu(); //사이트 메뉴
	$('#header').length && headFix(); //헤더고정
	$('.tab').length && tabBtn(); //탭 버튼
	$('.select_loc').length && resPanel(); //예약패널
	$('.datepicker').length && datepicker(); //날짜 선택
	$('.est_slide').length && estSlide(); //슬라이드
});

function siteMenu() {//사이트 메뉴
	$('.btn_site').on('click', function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active')
			$('.site_menu').fadeOut()
			$('body').css('overflow','')
		}else{
			$(this).addClass('active')
			$('.site_menu').fadeIn()
			$('body').css('overflow','hidden')
		}
	})
}

function headFix() {//헤더고정
	$(window).on('scroll', function(){
		var windowS = $(window).scrollTop()
		if(windowS > 50){
			$('#header').addClass('fixed')
		}else{
			$('#header').removeClass('fixed')
		}
	})
}

function tabBtn(){ //탭 버튼
	$('.tab a').on('click', function(e){
		e.preventDefault();
		$('.tab a').removeClass('active');
		$(this).addClass('active')
	})
}

function resPanel() { //예약패널
	$('.inpt').on('click', function(e){//input
		e.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active')
		}else{
			$('.inpt').removeClass('active')
			$(this).addClass('active')
		}
	});

	$(document).on('mouseup',function (e){ /* 닫기 */
		var selectArea = $('.inpt');
		if(selectArea.hasClass('active') && $('.group').has(e.target).length === 0){
			selectArea.removeClass('active');
		}
	});

	$('.btn_loc').on('click', function(){ //출발도착버튼 클릭
		var slt_txt = $(this).siblings().find('strong').text(),
			selectArea = $('.select_loc.active');
			selectArea.find('span').text(slt_txt);
			selectArea.removeClass('active');
	})

	$('#date_01_next').on('click', function(e){//가는날 다음 버튼
		e.preventDefault();
		var selectDate = $('.date_inpt.active');
		selectDate.removeClass('active')
		$('.date_inpt[name=date_02]').addClass('active')
	})

	$('#date_02_next').on('click', function(e){//오는날 다음 버튼
		e.preventDefault();
		var selectDate = $('.date_inpt.active');
		selectDate.removeClass('active')
		$('input[name=count]').focus()
	})
}

function datepicker() { //날짜 선택
	$.datepicker.setDefaults({
		beforeShowDay : nationalDays //달력이 보이기 전에 nationalDays 함수 실행
	});
	var natDays = [
		[2023,9,28,'ko','추석'],
		[2023,9,29,'ko','추석'],
		[2023,9,30,'ko','추석'],
		[2023,10,3,'ko','개천절'],
		[2023,10,9,'ko','한글날'],
		[2023,12,25,'ko','크리스마스'],
	];
	function nationalDays(date) {
		for (i = 0; i < natDays.length; i++) {
			if (date.getFullYear() == natDays[i][0] && date.getMonth() == natDays[i][1] - 1 && date.getDate() == natDays[i][2]) {
				return [true,'holiday'];
			}
		}
		return [true, ''];
	}

	$('.datepicker').each(function(){
		var _this = this.id

		$('#'+_this).datepicker({
			dateFormat:'yy.mm.dd',
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			showMonthAfterYear: true, //년도 다음 표시
			yearSuffix: ".", //타이틀 표시 방식
			showOtherMonths: true, //이전,다음달 표시
			todayHighlight :false,

			onSelect: function(dateText, inst) {//선택한 날짜 표시
				var date = $(this).val();
				$('.date_inpt[name=' + _this + ']').val(date)
			}
		})
	});
}

function estSlide() {//사이트 메뉴
	const estSlide = new Swiper('.est_slide', {
		loop:true,
		loopedSlides: 1,
		navigation: {
			prevEl: ".arr_prev",
			nextEl: ".arr_next",
		},
	});
}