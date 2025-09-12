// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  // Handle navigation clicks
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    })
  })

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const name = formData.get('name')
      const email = formData.get('email')
      const subject = formData.get('subject')
      const message = formData.get('message')

      // Create mailto link
      const mailtoSubject = `Posture App: ${subject}`
      const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(
        message
      )}`
      const mailtoLink = `mailto:apps@maadotaa.com?subject=${encodeURIComponent(
        mailtoSubject
      )}&body=${mailtoBody}`

      // Open default email client
      window.location.href = mailtoLink

      // Show success message
      showNotification(
        'Email client opened! Please send the email to complete your message.',
        'success'
      )

      // Reset form
      this.reset()
    })
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar')
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)'
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)'
      navbar.style.boxShadow = 'none'
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up')
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.feature-card, .screenshot-item, .privacy-feature'
  )
  animateElements.forEach(el => {
    observer.observe(el)
  })

  // Download button functionality - no longer needed as we have real App Store links
  // App Store links will open directly
})

// Notification system
function showNotification (message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification')
  existingNotifications.forEach(notification => notification.remove())

  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getNotificationIcon(type)}
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `

  // Add notification styles
  const style = document.createElement('style')
  style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border: 1px solid #e5e5e7;
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            border-left: 4px solid #34C759;
        }
        
        .notification-info {
            border-left: 4px solid #007AFF;
        }
        
        .notification-warning {
            border-left: 4px solid #FF9F0A;
        }
        
        .notification-error {
            border-left: 4px solid #FF3B30;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 16px;
        }
        
        .notification-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .notification-icon svg {
            width: 100%;
            height: 100%;
        }
        
        .notification-success .notification-icon {
            color: #34C759;
        }
        
        .notification-info .notification-icon {
            color: #007AFF;
        }
        
        .notification-warning .notification-icon {
            color: #FF9F0A;
        }
        
        .notification-error .notification-icon {
            color: #FF3B30;
        }
        
        .notification-message {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
            color: #1d1d1f;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            color: #86868b;
            transition: color 0.2s;
        }
        
        .notification-close:hover {
            color: #1d1d1f;
        }
        
        .notification-close svg {
            width: 100%;
            height: 100%;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `

  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles'
    document.head.appendChild(style)
  }

  // Add to DOM
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideInRight 0.3s ease-out reverse'
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function getNotificationIcon (type) {
  const icons = {
    success:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    warning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
  }
  return icons[type] || icons.info
}

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu () {
  const navMenu = document.querySelector('.nav-menu')
  navMenu.classList.toggle('nav-menu-open')
}

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    // Close any open notifications
    const notifications = document.querySelectorAll('.notification')
    notifications.forEach(notification => notification.remove())
  }
})

// Preload images for better performance
function preloadImages () {
  const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadImages)
} else {
  preloadImages()
}
