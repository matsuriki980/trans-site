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
const initTopPageBtn = () => {
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
// fv キャッチコピー 一文字ずつフェードイン
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
    span.style.setProperty("--fvcopy-delay", i);
    fvCopy.appendChild(span);
  });
});

// ==========================================================================================
// initFadeInObserverアニメーション
// ==========================================================================================

const initIntersectionObserver = () => {
  const options = {
    rootMargin: "0px 0px -70%", // 要素が画面上部に達したら実行
  };

  const fadeIn = () => {
    const fadeInTriggers = document.querySelectorAll(".fadeIn-trigger");

    const fadeInProcess = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const items = entry.target.querySelectorAll(
          ".fadeIn-item, .fadeIn-item-delay, .fadeIn-item-lead, .fadeIn-item-left, .fadeIn-item-right, .fadeIn-item-left-delay, .fadeIn-item-right-delay",
        );

        if (items.length === 0) return;

        items.forEach((item, i) => {
          // 連続フェードインの秒数を共通化
          item.style.setProperty("--fadeIn-delay", i);

          // 冗長になるので定数に
          const itemLeftDelay = item.classList.contains(
            "fadeIn-item-left-delay",
          );

          const itemRightDelay = item.classList.contains(
            "fadeIn-item-right-delay",
          );

          // 見出しフェードインの直後にリードアニメーションを実行
          if (item.classList.contains("fadeIn-item-lead")) {
            setTimeout(() => {
              item.classList.add("is-visible");
            }, 550);
            return;
          }

          // transformでX軸アニメーション
          if (itemLeftDelay || itemRightDelay) {
            setTimeout(() => {
              item.classList.add("is-visible");
            }, 300);
            return;
          }

          // 見出しフェードインから少し間をおいてアニメーション
          if (item.classList.contains("fadeIn-item-delay")) {
            setTimeout(() => {
              item.classList.add("is-visible");
            }, 750);
            return;
          }

          // トリガー要素が判定ラインと交わったら即時実行
          item.classList.add("is-visible");
        });

        observer.unobserve(entry.target); //全て実行したら監視を終了、アニメーションは一度のみ
      });
    };

    const FadeInObserver = new IntersectionObserver(fadeInProcess, options);

    // ----------------------------------------
    // 監視対象はfadeInTriggersで統一
    // ----------------------------------------
    fadeInTriggers.forEach((target) => {
      FadeInObserver.observe(target);
    });

    // ----------------------------------------
    // 見出し 一文字ずつフェードイン
    // ----------------------------------------
    const headings = document.querySelectorAll(".heading__text");

    headings.forEach((heading) => {
      const headingText = heading.textContent;
      const chars = headingText.split("");
      heading.textContent = "";
      heading.style.opacity = "1";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.setProperty("--heading-delay", i);
        heading.appendChild(span);
      });
    });
  };
  fadeIn();
};

// ==========================================================================================
// 全ての処理を初期化
// ==========================================================================================

window.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initTopPageBtn();
  initIntersectionObserver();
});
