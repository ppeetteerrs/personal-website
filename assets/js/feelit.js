function init() {
	for (let element of document.getElementsByClassName("details")) {
		const $summary = element.getElementsByClassName("details-summary")[0];
		$summary.addEventListener(
			"click",
			() => {
				console.log("ouchhhhhhhhh");
				element.classList.toggle("open");
			},
			false
		);
	}

	for (let element of $("pre > code")) {
		const $pre = $(element).parent().get(0);
		$pre.classList.add("highlight");
		const $header = document.createElement("div");
		$header.className = "code-header " + element.className.toLowerCase();

		const $title = document.createElement("span");
		$title.classList.add("code-title");
		$title.insertAdjacentHTML("afterbegin", '<i class="arrow fas fa-chevron-right fa-fw"></i>');
		$title.addEventListener(
			"click",
			() => {
				$pre.classList.toggle("open");
			},
			false
		);
		$header.appendChild($title);
		const $ellipses = document.createElement("span");
		$ellipses.insertAdjacentHTML("afterbegin", '<i class="fas fa-ellipsis-h fa-fw"></i>');
		$ellipses.classList.add("ellipses");
		$ellipses.addEventListener(
			"click",
			() => {
				$pre.classList.add("open");
			},
			false
		);
		$header.appendChild($ellipses);
		const $copy = document.createElement("span");
		$copy.insertAdjacentHTML("afterbegin", '<i class="far fa-copy fa-fw"></i>');
		$copy.classList.add("copy");
		const code = element.innerText;
		$pre.classList.add("open");
		$copy.setAttribute("data-clipboard-text", code);
		$copy.title = "Copy";
		const clipboard = new ClipboardJS($copy);
		clipboard.on("success", (_e) => {
			this.util.animateCSS($code, "flash");
		});
		$header.appendChild($copy);
		$pre.insertBefore($header, $pre.firstChild);
		const $wrapper = document.createElement("div");
		$pre.replaceChild($wrapper, element);
		$wrapper.classList.add("code-wrapper");
		$wrapper.appendChild(element);
	}
}

if (document.readyState !== "loading") {
	init();
} else {
	document.addEventListener("DOMContentLoaded", init, false);
}
