// Handle profile picture upload
document.getElementById('profile-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// ---------------------------------------------------------------------------
async function connectWallet() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('Bro MetaMask is not installed! Please install the extension.');
        window.open('https://metamask.io/download.html', '_blank'); //open in new tab
        return "Done";
    }

    try {
        // Request wallet access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        // Get first connected account
        const walletAddress = accounts[0];

        //network check karga 
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const supportedNetworks = {
            '0x1': 'Ethereum Mainnet',
            '0x5': 'Goerli Testnet',
            '0x13881': 'Mumbai Testnet' // Only add networks you want to support
        };

        if (!supportedNetworks[chainId]) {
            alert(`Please switch to a supported network. Current: ${chainId}`);
            return null;
        }

        // Update UI to show connected wallet
        document.getElementById('wallet-address').textContent = `Connected: ${walletAddress}`;
        document.getElementById('wallet-address').style.display = 'block'; //visible ho jata hai (agar pehle hidden tha).

         // Show success message
        showStatus('Wallet connected successfully!', 'success');

        // Optional: Create signature for additional security
        const signature = await signMessage(walletAddress);

        return {
            address: walletAddress,
            signature: signature,
            network: supportedNetworks[chainId]
        };

    } catch (error) {
        console.error('Wallet Connection Error:', error);
        alert('Failed to connect wallet. Please try again.');
        return null;
    }
}

// ---------------------------------------------------------------------------
// Optional signature method for additional authentication
async function signMessage(address) {
    const message = `Web3 Authentication\n\nNonce: ${Date.now()}\n\nBy signing, you verify wallet ownership.`;
    
    try {
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address]
        });
        return signature;
    } catch (error) {
        console.error('Signature Error:', error);
        return null;
    }
} 

// Event listeners for wallet changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // Wallet disconnected
            document.getElementById('wallet-address').style.display = 'none';
        } else {
            // Reconnect
            connectWallet();
        }
    });

    window.ethereum.on('chainChanged', () => {
        // Reload to reset connection
        window.location.reload();
    });
}


// ---------------------------------------------------------------------------
// Complete registration function
async function completeRegistration() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profilePicture = document.getElementById('profile-preview').src;
    
    if (!username) {
        showStatus('Please enter a username', 'error');
        return;
    }else if(!email){
        showStatus('Please enter a email', 'error');
        return;
    }else if(!password){
        showStatus('Please enter a password', 'error');
        return;
    }

    // Here you would typically send this data to your backend
    // For this example, we'll just show a success message
    showStatus('Registration completed successfully!', 'success');
    
    // Redirect to profile page after short delay
    setTimeout(() => {
        // Replace with your actual profile page URL
        window.location.href = 'index.html';
    }, 2000);
}

// Show status message
function showStatus(message, type) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    statusElement.style.display = 'block';
}