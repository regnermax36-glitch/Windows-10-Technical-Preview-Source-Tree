import { Wllama } from '@wllama/wllama/esm/index.js';

// Configuration for Wllama
const CONFIG = {
  modelUrl: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf',
  wasmConfig: {
    'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.7/dist/single-thread/wllama.wasm',
    'multi-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.7/dist/multi-thread/wllama.wasm',
  }
};

document.addEventListener('DOMContentLoaded', async () => {
    const edgeHandle = document.getElementById('edge-handle');
    const edgeSidebar = document.getElementById('edge-sidebar');
    const julesTrigger = document.getElementById('jules-trigger');
    const julesOverlay = document.getElementById('jules-overlay');
    const smartThingsBtn = document.getElementById('smart-things-btn');
    const julesResponse = document.getElementById('jules-response');
    const responseText = document.getElementById('response-text');
    const spenLayer = document.getElementById('spen-selection');
    const selectionBox = document.getElementById('selection-box');
    const statusIndicator = document.getElementById('status-indicator');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    let sidebarOpen = false;
    let wllama = null;
    let isModelLoaded = false;

    // Initialize Wllama
    const initAI = async () => {
        if (isModelLoaded) return;

        statusIndicator.innerText = 'Initializing AI Brain...';
        statusIndicator.classList.remove('hidden');

        try {
            wllama = new Wllama(CONFIG.wasmConfig);
            await wllama.loadModelFromUrl(CONFIG.modelUrl, {
                progressCallback: ({ loaded, total }) => {
                    const progress = Math.round((loaded / total) * 100);
                    statusIndicator.innerText = `Downloading Brain: ${progress}%`;
                }
            });
            isModelLoaded = true;
            statusIndicator.innerText = 'AI Online';
            setTimeout(() => statusIndicator.classList.add('hidden'), 2000);
        } catch (err) {
            console.error('AI Init Error:', err);
            statusIndicator.innerText = 'AI Offline (Error)';
        }
    };

    // Toggle Edge Sidebar
    edgeHandle.addEventListener('click', () => {
        sidebarOpen = !sidebarOpen;
        edgeSidebar.style.right = sidebarOpen ? '0px' : '-100px';
        edgeHandle.style.right = sidebarOpen ? '80px' : '0px';
    });

    // Toggle Jules Overlay
    julesTrigger.addEventListener('click', () => {
        const isOpen = julesOverlay.style.bottom === '0px';
        julesOverlay.style.bottom = isOpen ? '-100%' : '0px';

        if (!isOpen) {
            initAI();
        } else {
            julesResponse.classList.add('hidden');
        }
    });

    // Real AI Inference
    const askJules = async (prompt) => {
        if (!isModelLoaded) await initAI();

        julesResponse.classList.remove('hidden');
        responseText.innerText = 'Thinking...';

        try {
            let fullResponse = '';
            await wllama.createCompletion(prompt, {
                nPredict: 100,
                sampling: { temp: 0.7, topP: 0.9 },
                onNewToken: (token, piece, currentText) => {
                    fullResponse = currentText;
                    responseText.innerText = fullResponse;
                }
            });
        } catch (err) {
            console.error('Inference Error:', err);
            responseText.innerText = 'Sorry, my neural links are fuzzy right now.';
        }
    };

    smartThingsBtn.addEventListener('click', () => {
        askJules('Respond as a futuristic AI assistant named Jules for a Samsung Galaxy user. The user wants to prepare the living room. Suggest settings for lights and temperature.');
    });

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            askJules(text);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Simulate S-Pen "Smart Select"
    window.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            spenLayer.classList.remove('hidden');
            selectionBox.style.width = '200px';
            selectionBox.style.height = '150px';
            selectionBox.style.top = '100px';
            selectionBox.style.left = '50px';

            setTimeout(() => {
                spenLayer.classList.add('hidden');
                julesOverlay.style.bottom = '0px';
                initAI();
            }, 1500);
        }
    });
});
