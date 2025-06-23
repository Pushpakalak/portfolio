// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains("skills")) {
        animateSkillBars()
      }
    }
  })
}, observerOptions)

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to various elements
  document.querySelectorAll(".section-title, .section-title-new").forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  document.querySelectorAll(".profile-card, .skill-category, .project-card").forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Observe skills section for skill bar animation
  const skillsSection = document.querySelector(".skills")
  if (skillsSection) {
    observer.observe(skillsSection)
  }
})

// Animate skill bars
function animateSkillBars() {
  const progressBars = document.querySelectorAll(".progress-bar")
  progressBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, index * 200)
  })
}

// Form handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const mobile = formData.get("mobile")
    const email = formData.get("email")
    const address = formData.get("address")
    const message = formData.get("message")

    // Simple validation
    if (!name || !mobile || !email || !address) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Mobile validation
    const mobileRegex = /^[+]?[\d\s\-()]{10,15}$/
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid mobile number.")
      return
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you! Your message has been sent successfully.")
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      // Log form data (in real app, this would be sent to server)
      console.log("Form submitted with data:", {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        address: address.trim(),
        message: message.trim(),
      })
    }, 1500)
  })
}

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for decorative elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const decorations = document.querySelectorAll(".decoration")

  decorations.forEach((decoration, index) => {
    const speed = 0.3 + index * 0.1
    const yPos = -(scrolled * speed)
    decoration.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`
  })
})

// Enhanced floating animation for decorations
document.addEventListener("DOMContentLoaded", () => {
  const decorations = document.querySelectorAll(".decoration")

  decorations.forEach((decoration, index) => {
    // Add random slight rotation and movement
    setInterval(
      () => {
        const randomX = Math.random() * 10 - 5
        const randomY = Math.random() * 10 - 5
        const randomRotate = Math.random() * 10 - 5

        decoration.style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`

        setTimeout(() => {
          decoration.style.transform = decoration.style.transform.replace(
            ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`,
            "",
          )
        }, 2000)
      },
      3000 + index * 1000,
    )
  })
})

// Add loading animation for page
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Typing effect for home title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      if (text.charAt(i) === "<") {
        // Handle HTML tags
        const tagEnd = text.indexOf(">", i)
        element.innerHTML += text.substring(i, tagEnd + 1)
        i = tagEnd + 1
      } else {
        element.innerHTML += text.charAt(i)
        i++
      }
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect (uncomment if you want this feature)
/*
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.home-title');
    const originalText = titleElement.innerHTML;
    
    setTimeout(() => {
        typeWriter(titleElement, originalText, 80);
    }, 1000);
});
*/

// Add smooth reveal animation for about cards
const aboutCards = document.querySelectorAll(".detail-card")
aboutCards.forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "all 0.6s ease"
  card.style.transitionDelay = `${index * 0.1}s`
})

// Reveal about cards when in view
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".detail-card")
        cards.forEach((card) => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        })
      }
    })
  },
  { threshold: 0.3 },
)

const aboutSection = document.querySelector(".about-details-grid")
if (aboutSection) {
  aboutObserver.observe(aboutSection)
}

// Counter animation for achievements
function animateCounters() {
  const counters = document.querySelectorAll(".achievement .number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when about section is visible
const aboutSection2 = document.querySelector(".about")
if (aboutSection2) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counterObserver.observe(aboutSection2)
}

// Add stagger animation to skill bubbles
document.addEventListener("DOMContentLoaded", () => {
  const skillBubbles = document.querySelectorAll(".skill-bubble")

  skillBubbles.forEach((bubble, index) => {
    bubble.style.opacity = "0"
    bubble.style.transform = "translateY(30px)"
    bubble.style.transition = "all 0.6s ease"
    bubble.style.transitionDelay = `${index * 0.1}s`
  })

  // Animate skill bubbles when skills section is visible
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bubbles = entry.target.querySelectorAll(".skill-bubble")
          bubbles.forEach((bubble) => {
            bubble.style.opacity = "1"
            bubble.style.transform = "translateY(0)"
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  const skillsSection = document.querySelector(".skills")
  if (skillsSection) {
    skillsObserver.observe(skillsSection)
  }
})

// Add floating animation to about elements
document.addEventListener("DOMContentLoaded", () => {
  const floatItems = document.querySelectorAll(".float-item")

  floatItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.2) translateY(-10px)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1) translateY(0)"
    })
  })
})

// document.querySelectorAll('.floating-element').forEach(el => {
//     el.style.setProperty('--random-x', Math.random());
// });

