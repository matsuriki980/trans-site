// ==========================================================================================
// ハンバーガーメニュー
// ==========================================================================================

const initHamburgerMenu = () => {
  if (window.innerWidth < 896) {
    const btn = document.querySelector("#hamburger-btn");
    const menu = document.querySelector("#hamburger-menu");

    if (!btn || !menu) return; // 要素がなければ処理を止める

    btn.addEventListener("click", () => {
      if (!btn.classList.contains("is-open")) {
        btn.classList.add("is-open");
        menu.classList.add("is-open");
        document.body.style.overflow = "hidden"; // メニューオープン時、スクロールを止める
      } else {
        btn.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }
};

// ==========================================================================================
// トップページボタン
// ==========================================================================================
const topPageBtn = () => {
  if (window.innerWidth > 896) {
    const btn = document.querySelector("#top-page-btn");
    const fv = document.querySelector("#fv");
    const footer = document.querySelector("#footer");
    const pageHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const fvBottom = fv.getBoundingClientRect().bottom;
    const footerTop = footer.getBoundingClientRect().top;

    // ビューポート最上部がfv最下部を超えたとき、ビューポート最下部がfooter最上部を超えていないときに表示
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const viewportBottom = scrolled + viewHeight;
      if (scrolled > fvBottom && viewportBottom < footerTop) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    });

    // ボタンクリックでページ最上部へ
    btn.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }
};

// ==========================================================================================
// fv キャッチコピー
// ==========================================================================================
const fvCopys = document.querySelectorAll(".fv-copy");

fvCopys.forEach((fvCopy) => {
  const fvCopyText = fvCopy.textContent;
  const chars = fvCopyText.split("");
  fvCopy.textContent = "";
  fvCopy.style.opacity = "1";

  chars.forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.setProperty("--i", i);
    fvCopy.appendChild(span);
  });
});

// ==========================================================================================
// feature / company キャッチコピー
// ==========================================================================================
const copyBackground = () => {
  const copys = document.querySelectorAll(".copy__area");

  const options = {
    rootMargin: "-50% 0px", // ビューポートの中央を基準にアニメーション
  };

  const initCopyFadeInObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target); // 無駄な処理をなくすために監視停止
    });
  };

  const copyObserver = new IntersectionObserver(initCopyFadeInObserver,options);

  copys.forEach((copy) => {
    copyObserver.observe(copy);
  });
};

// ==========================================================================================
// 全ての処理を初期化
// ==========================================================================================

window.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  topPageBtn();
  copyBackground();
});
