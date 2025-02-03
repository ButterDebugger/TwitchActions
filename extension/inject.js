console.log("Chat actions loaded");

document.addEventListener("mouseover", (e) => {
	// Get the chat element
	const chatEle = getChatElement(e.target);
	if (chatEle === null) return; // Cancel if not found

	// Get the actions container
	const actionsEle = chatEle.querySelector(".chat-line__icons");
	if (actionsEle === null) return; // Cancel if not found

	// Cancel if the action has already been applied
	if (chatEle.classList.contains("actions-applied")) return;
	chatEle.classList.add("actions-applied");

	// Add actions
	const a = parseHTML(
		`<div class="Layout-sc-1xcs6mc-0">
            <div class="Layout-sc-1xcs6mc-0 eSzBZn chat-line__pin-icon chat-line__icon">
                <div class="InjectLayout-sc-1i43xsx-0 kBtJDm">
                    <button class="ScCoreButton-sc-ocjdkq-0 kIbAir ScButtonIcon-sc-9yap0r-0 eSFFfM">
                        <div class="ButtonIconFigure-sc-1emm8lf-0 buvMbr">
                            <div class="ScFigure-sc-wkgzod-0 fewniq tw-svg">
                                <svg width="20" height="20" viewBox="0 0 20 20" focusable="false" aria-hidden="true" role="presentation">
                                    <path fill-rule="evenodd" d="M 7 6 L 13 7 L 13 9 L 7 9 Z M 7 5 L 7 3 L 13 2 L 13 6 Z M 5 12 Q 5 10 7 10 L 13 10 Q 15 10 15 12 L 15 18 L 13 18 L 13 12 L 7 12 L 7 16 L 13 16 L 13 18 L 5 18 Z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>`,
	);

	a.addEventListener("click", () => {
		console.log(chatEle.parentElement);
		const copy = copyStaticElement(chatEle.parentElement);
		copy.querySelector(".chat-line__icons").remove();

		console.log(copy.innerHTML);

		fetch("http://localhost:3672/highlight", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: copy.innerHTML,
			}),
		});
	});

	actionsEle.appendChild(a);
});

/**
 * Traverses up until it finds the chat element
 * Returns null if not found
 * @param {Element} element
 * @returns {Element | null}
 */
function getChatElement(element) {
	let item = element;

	while (item !== null) {
		if (item.classList.contains("chat-line__message")) {
			return item;
		}

		item = item.parentElement;
	}

	return null;
}

/**
 * Parses a string of HTML into an Element
 * @param {string} input
 * @returns {Element}
 */
function parseHTML(input) {
	const temp = document.createElement("div");
	temp.innerHTML = input;
	return temp.children[0];
}

function copyStaticElement(element) {
	// Credit to https://stackoverflow.com/a/1848489/9582721 for the style copy script
	const realStyle = (_elem, _style) => {
		let computedStyle;
		if (typeof _elem.currentStyle !== "undefined") {
			computedStyle = _elem.currentStyle;
		} else {
			computedStyle = document.defaultView.getComputedStyle(_elem, null);
		}

		return _style ? computedStyle[_style] : computedStyle;
	};

	const copyComputedStyle = (src, dest) => {
		const s = realStyle(src);
		for (const i in s) {
			// Do not use `hasOwnProperty`, nothing will get copied
			if (
				typeof s[i] === "string" &&
				s[i] &&
				i !== "cssText" &&
				!/\d/.test(i)
			) {
				// The try is for setter only properties
				try {
					dest.style[i] = s[i];
					// `fontSize` comes before `font` If `font` is empty, `fontSize` gets
					// overwritten.  So make sure to reset this property. (hackyhackhack)
					// Other properties may need similar treatment
					if (i === "font") {
						dest.style.fontSize = s.fontSize;
					}
				} catch (e) {}
			}
		}
	};

	// Recursively copy computed styles
	const recursiveCopy = (src, dest) => {
		copyComputedStyle(src, dest);

		if (dest.children.length === 0) return;

		for (let i = 0; i < src.children.length; i++) {
			const child = src.children[i];
			recursiveCopy(child, dest.children[i]);
		}
	};

	const copy = element.cloneNode(true);
	const destination = document.createElement("div");
	destination.appendChild(copy);
	recursiveCopy(element, copy);

	return destination.firstChild;
}
