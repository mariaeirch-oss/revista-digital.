// ==========================================
// MENU MOBILE
// ==========================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
        menuButton.innerHTML = "✕";
    } else {
        menuButton.innerHTML = "☰";
    }

});


// Fecha o menu quando clicar em algum link

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.innerHTML = "☰";

    });

});


// ==========================================
// NAVEGAÇÃO ATIVA
// ==========================================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================

const topButton =
    document.getElementById("topButton");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// MODO ESCURO
// ==========================================

const themeButton =
    document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (
        document.body.classList.contains("dark")
    ) {

        themeButton.innerHTML = "☀";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.innerHTML = "☾";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// Mantém o tema escolhido

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.innerHTML = "☀";

}


// ==========================================
// CONTADORES
// ==========================================

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const duration = 1800;

                const increment =
                    target / (duration / 16);

                function updateCounter() {

                    current += increment;

                    if (current < target) {

                        counter.textContent =
                            Math.floor(current)
                            .toLocaleString("pt-BR");

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString(
                                "pt-BR"
                            );

                    }

                }

                updateCounter();

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


// ==========================================
// ANIMAÇÕES AO ROLAR
// ==========================================

const animatedElements =
    document.querySelectorAll(
        ".card, .bin, .step, .tip, .article-image"
    );

animatedElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    revealObserver.observe(element);

});
