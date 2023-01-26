new WOW().init();
let burgerIcon = document.querySelector('.navbar__icon')
let navbarList = document.querySelector('.navbar__list')
let body = document.querySelector('body')
burgerIcon.addEventListener('click', function () {
    burgerIcon.classList.toggle("active")
    navbarList.classList.toggle("active")
    body.classList.toggle('lock')
})

const maskPhone = () => {
    const inputsPhone = document.querySelectorAll('input[name="phone"]');

    inputsPhone.forEach((input) => {
        let keyCode;

        const mask = (event) => {
            event.keyCode && (keyCode = event.keyCode);
            let pos = input.selectionStart;

            if (pos < 3) {
                event.preventDefault();
            }
            let matrix = "+998 (__) ___ __ __ ",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = input.value.replace(/\D/g, ""),
                newValue = matrix.replace(/[_\d]/g, (a) => {
                    if (i < val.length) {
                        return val.charAt(i++) || def.charAt(i);
                    } else {
                        return a;
                    }
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                newValue = newValue.slice(0, i);
            }

            let reg = matrix
                .substr(0, input.value.length)
                .replace(/_+/g, (a) => {
                    return "\\d{1," + a.length + "}";
                })
                .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(input.value) || input.value.length < 5 || (keyCode > 20 && keyCode < 30)) {
                input.value = newValue;
            }
            if (event.type == "blur" && input.value.length < 5) {
                input.value = "";
            };
        };
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
}
maskPhone();

$(document).ready(function () {
	$('ul.navbar__list a[href^="#"]').click(function () {
		let target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 500);
burgerIcon.classList.remove("active")
    navbarList.classList.remove("active")
    body.classList.remove('lock')
		return false
	});
});