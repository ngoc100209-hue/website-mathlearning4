/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 1. Thêm border độc lập vào đây để sửa lỗi border-border
        border: '#ede5dd', 
        
        // 2. Giữ nguyên hệ màu primary cũ của bạn
        primary: {
          50: '#f5f3f0',
          100: '#ede5dd',
          200: '#dccfbb',
          300: '#c9b599',
          400: '#b89977',
          500: '#8b5000',
          600: '#7a4500',
          700: '#653900',
          800: '#532f00',
          900: '#2c1600',
        },

        // 3. Giữ nguyên hệ màu accent của bạn
        accent: {
          50: '#fffbf0',
          100: '#ffecd1',
          200: '#ffd4a3',
          300: '#ffb870',
          400: '#ff9800',
          500: '#ff8c00',
          600: '#e67e00',
          700: '#cc7000',
          800: '#b26200',
          900: '#8b4f00',
        },

        // 4. Giữ nguyên hệ màu secondary của bạn
        secondary: {
          50: '#fffbf0',
          100: '#fff3d6',
          200: '#ffe087',
          300: '#fdd34d',
          400: '#ebc23e',
          500: '#735c00',
          600: '#6b5300',
          700: '#5a4600',
          800: '#483800',
          900: '#241a00',
        },

        // 5. Giữ nguyên hệ màu tertiary của bạn
        tertiary: {
          50: '#e0f8fc',
          100: '#b3eff7',
          200: '#80e5f1',
          300: '#4dd9eb',
          400: '#1bc2da',
          500: '#006876',
          600: '#00606e',
          700: '#004b56',
          800: '#003a42',
          900: '#001f27',
        },
      },
    },
  },
  plugins: [],
}
