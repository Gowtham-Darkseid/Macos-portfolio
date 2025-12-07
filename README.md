# 🍎 macOS Portfolio

A stunning, interactive portfolio website designed to look and feel like macOS. Experience a desktop-like interface with windows, dock, launchpad, and more!

![macOS Portfolio](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### Desktop Experience
- 🖥️ **macOS-style Desktop** - Complete with menu bar, dock, and desktop icons
- 🪟 **Draggable Windows** - Resizable, minimizable windows just like real macOS
- 🚀 **Launchpad** - Beautiful app launcher with blur effects
- 🌐 **Safari Browser** - Built-in browser to showcase projects
- 💻 **Terminal** - Interactive terminal with custom commands
- 🎵 **Spotify Widget** - Music player integration
- 🖼️ **Dynamic Wallpapers** - Change wallpapers from beautiful nature scenes

### Mobile Experience (iOS Style)
- 📱 **iOS Lock Screen** - Swipe to unlock with time, notifications, and quick actions
- 🏠 **Widget Home Screen** - iOS 17-style widgets with profile, quick actions, and social links
- 📲 **App Grid** - Native iOS-style app icons and layout
- 🎨 **Glassmorphism Design** - Beautiful blur and transparency effects
- 👆 **Touch Optimized** - Smooth swipe gestures and touch interactions

### Content Sections
- 👤 **About Me** - Personal introduction and info
- 💼 **Projects** - Showcase of work with links
- 🛠️ **Skills** - Technical skills with progress bars
- 📄 **Resume** - Experience and education
- 📧 **Contact** - Get in touch form

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Gowtham-Darkseid/Macos-portfolio.git
cd Macos-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (optional)
- **React Icons** - Icon library

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── icons/          # App icons
│   │   ├── profile.jpeg    # Profile image
│   │   └── ...
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Hero.js         # Main desktop component
│   │   ├── MobileIOSView.js # Mobile iOS interface
│   │   ├── MacWindow.js    # Draggable window component
│   │   ├── Terminal.js     # Terminal emulator
│   │   ├── Launchpad.js    # App launcher
│   │   ├── Safari.js       # Browser component
│   │   ├── Spotify.js      # Music widget
│   │   └── MacOSMenuBar.js # Top menu bar
│   ├── App.js
│   └── index.js
└── package.json
```

## 🎨 Customization

### Update Personal Info
Edit the content in `src/components/Hero.js` and `src/components/MobileIOSView.js`:
- Name, email, location
- Skills and experience
- Projects and links
- Social media URLs

### Change Wallpaper
The wallpaper list is in `Hero.js` - add your own Unsplash URLs or local images.

### Add New Apps
Add new items to the `apps` array in `MobileIOSView.js` or dock items in `Hero.js`.

## 📱 Responsive Design

- **Desktop (768px+)**: Full macOS experience with windows, dock, and menu bar
- **Mobile (<768px)**: iOS-style interface with lock screen and home screen

## 🌟 Live Demo

[View Live Demo](https://your-portfolio-url.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Gowtham**
- GitHub: [@Gowtham-Darkseid](https://github.com/Gowtham-Darkseid)
- Email: graj200026@gmail.com

## 🙏 Acknowledgments

- Apple for the macOS/iOS design inspiration
- Unsplash for beautiful wallpaper images
- The React and Tailwind CSS communities

---

⭐ Star this repo if you like it!
