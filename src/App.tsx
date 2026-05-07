import "@mantine/core/styles.css";
import './App.css';
import HomePage from './Components/HomePage';
import UploadPage from './Components/UploadPage';
import { MantineProvider, createTheme } from '@mantine/core';
import { pdfjs } from 'react-pdf';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const theme = createTheme({
    breakpoints: {
        xs: '320px',
        sm: '476px',
        md: '640px',
        bs: '768px',
        lg: '900px',
        xl: '1024',
        '2xl': '1280',
    },
});

function App() {
    useEffect(() => {
        AOS.init({ once: true, offset: 60, easing: 'ease-out' });
    }, []);

    return (
        <MantineProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Secret admin route — not linked anywhere in the portfolio */}
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </HashRouter>
        </MantineProvider>
    );
}

export default App;
