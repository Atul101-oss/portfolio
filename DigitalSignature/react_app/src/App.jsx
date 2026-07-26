import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sign'); // 'sign', 'verify', 'vault', 'hash'
  const [userState, setUserState] = useState({ authenticated: false, username: null, keys: [] });
  const [notification, setNotification] = useState('');

  // Key Generator State
  const [keyName, setKeyName] = useState('My RSA Keypair');
  const [generatedKeyResult, setGeneratedKeyResult] = useState(null);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [showGenPrivateKey, setShowGenPrivateKey] = useState(false);
  const [visibleKeyIds, setVisibleKeyIds] = useState({});

  // Document Signing State
  const [signFile, setSignFile] = useState(null);
  const [selectedKeyId, setSelectedKeyId] = useState('');
  const [customPrivKey, setCustomPrivKey] = useState('');
  const [signing, setSigning] = useState(false);
  const [signResult, setSignResult] = useState(null);

  // Document Verification State
  const [verifyFile, setVerifyFile] = useState(null);
  const [signatureText, setSignatureText] = useState('');
  const [sigFile, setSigFile] = useState(null);
  const [publicKeyText, setPublicKeyText] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);

  // Text Hash State
  const [inputText, setInputText] = useState('');
  const [hashResult, setHashResult] = useState(null);

  const fetchUserKeys = async () => {
    try {
      const res = await fetch('/DigitalSignature/userKeys/');
      const data = await res.json();
      setUserState(data);
      if (data.keys.length > 0 && !selectedKeyId) {
        setSelectedKeyId(data.keys[0].id.toString());
      }
    } catch (err) {
      console.error('Error fetching user keys:', err);
    }
  };

  useEffect(() => {
    fetchUserKeys();
  }, []);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const downloadFile = (filename, text) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 1. Key Generation
  const handleGenerateKeys = async () => {
    if (!userState.authenticated) {
      showToast('Login required to generate RSA private keypairs.');
      window.location.href = '/login/?next=/DigitalSignature/';
      return;
    }

    setLoadingKeys(true);
    const formData = new FormData();
    formData.append('key_name', keyName || 'RSA-2048 Keypair');

    try {
      const res = await fetch('/DigitalSignature/keyGenerator/', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.status === 401 || data.login_required) {
        showToast('Login required to generate keypairs.');
        window.location.href = '/login/?next=/DigitalSignature/';
        return;
      }
      setGeneratedKeyResult(data);
      showToast('Keypair generated and saved to your account!');
      fetchUserKeys();
    } catch (err) {
      console.error('Error generating keys:', err);
      showToast('Failed to generate keypair.');
    } finally {
      setLoadingKeys(false);
    }
  };

  // 2. Delete Key
  const handleDeleteKey = async (keyId) => {
    if (!window.confirm('Are you sure you want to delete this keypair from your account?')) return;
    try {
      const res = await fetch(`/DigitalSignature/deleteKey/${keyId}/`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast('Keypair deleted from your account.');
        fetchUserKeys();
      }
    } catch (err) {
      console.error('Error deleting key:', err);
    }
  };

  // 3. Document Signing
  const handleSignDocument = async (e) => {
    e.preventDefault();
    if (!userState.authenticated) {
      showToast('Login required to sign documents.');
      window.location.href = '/login/?next=/DigitalSignature/';
      return;
    }
    if (!signFile) {
      showToast('Please select a file to sign (e.g. PDF, Document, Image).');
      return;
    }

    setSigning(true);
    const formData = new FormData();
    formData.append('file', signFile);
    if (selectedKeyId) formData.append('key_id', selectedKeyId);
    if (customPrivKey) formData.append('private_key', customPrivKey);

    try {
      const res = await fetch('/DigitalSignature/signDocument/', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.status === 401 || data.login_required) {
        showToast('Login required to sign documents.');
        window.location.href = '/login/?next=/DigitalSignature/';
        return;
      }
      if (data.error) {
        showToast(`Error: ${data.error}`);
        return;
      }
      setSignResult(data);
      showToast('Document digitally signed successfully!');
    } catch (err) {
      console.error('Error signing document:', err);
      showToast('Failed to sign document.');
    } finally {
      setSigning(false);
    }
  };

  // 4. Document Verification
  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    if (!verifyFile) {
      showToast('Please upload the original document file (PDF / file) to verify.');
      return;
    }
    if (!signatureText && !sigFile) {
      showToast('Please provide a signature string or upload a .sig file.');
      return;
    }
    if (!publicKeyText) {
      showToast('Please paste the signer’s Public Key.');
      return;
    }

    setVerifying(true);
    const formData = new FormData();
    formData.append('file', verifyFile);
    formData.append('signature', signatureText);
    if (sigFile) formData.append('sig_file', sigFile);
    formData.append('public_key', publicKeyText);

    try {
      const res = await fetch('/DigitalSignature/verifyDocument/', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.error) {
        showToast(`Error: ${data.error}`);
        return;
      }
      setVerifyResult(data);
    } catch (err) {
      console.error('Error verifying document:', err);
      showToast('Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  // 5. Text Hash
  const handleGenerateHash = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('input_text', inputText);
    try {
      const res = await fetch('/DigitalSignature/getHash/', { method: 'POST', body: formData });
      const data = await res.json();
      setHashResult(data.hash_value);
    } catch (err) {
      console.error('Error generating hash:', err);
    }
  };

  const handleSigFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSigFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setSignatureText(event.target.result.trim());
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
            ← Back to Portfolio
          </a>
          <div>
            {userState.authenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#e0e7ff', padding: '0.4rem 1rem', borderRadius: '9999px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3730a3' }}>
                  Logged in as <strong>{userState.username}</strong>
                </span>
                <a href="/logout/?next=/DigitalSignature/" style={{ fontSize: '0.8rem', color: '#4338ca', fontWeight: 600, textDecoration: 'underline' }}>
                  Logout
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Login required to sign & manage keys</span>
                <a href="/login/?next=/DigitalSignature/" style={{ padding: '0.4rem 1rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
                  Login / Register
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Header Title */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            🔏 Document Digital Signature Suite
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', margin: 0 }}>
            Cryptographically sign & verify PDF documents, images, and files using RSA-2048 keypairs.
          </p>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', backgroundColor: '#1e293b', color: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 1000, fontSize: '0.9rem', fontWeight: 500 }}>
            {notification}
          </div>
        )}

        {/* Feature Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem', gap: '0.5rem', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('sign')}
            style={{ padding: '0.75rem 1.25rem', border: 'none', borderBottom: activeTab === 'sign' ? '3px solid #2563eb' : '3px solid transparent', backgroundColor: 'transparent', color: activeTab === 'sign' ? '#1d4ed8' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            📄 Sign Document (PDF)
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            style={{ padding: '0.75rem 1.25rem', border: 'none', borderBottom: activeTab === 'verify' ? '3px solid #2563eb' : '3px solid transparent', backgroundColor: 'transparent', color: activeTab === 'verify' ? '#1d4ed8' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            🔍 Verify Signature
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            style={{ padding: '0.75rem 1.25rem', border: 'none', borderBottom: activeTab === 'vault' ? '3px solid #2563eb' : '3px solid transparent', backgroundColor: 'transparent', color: activeTab === 'vault' ? '#1d4ed8' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            🔑 Key Vault & RSA Generator
          </button>
          <button
            onClick={() => setActiveTab('hash')}
            style={{ padding: '0.75rem 1.25rem', border: 'none', borderBottom: activeTab === 'hash' ? '3px solid #2563eb' : '3px solid transparent', backgroundColor: 'transparent', color: activeTab === 'hash' ? '#1d4ed8' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            ✍️ Quick Hash Tool
          </button>
        </div>

        {/* TAB 1: SIGN DOCUMENT */}
        {activeTab === 'sign' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', color: '#0f172a' }}>✍️ Digitally Sign a Document (PDF / File)</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Select a file and your RSA private key to generate an authentic SHA-256 RSA digital signature.
            </p>

            {!userState.authenticated ? (
              <div style={{ padding: '1.25rem', backgroundColor: '#fffbebfb', border: '1px solid #fef08a', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#854d0e', fontSize: '0.95rem' }}>
                    🔒 Authentication Required
                  </p>
                  <p style={{ margin: 0, color: '#a16207', fontSize: '0.85rem' }}>
                    You must be logged in to sign documents with your account's private keys.
                  </p>
                </div>
                <a href="/login/?next=/DigitalSignature/" style={{ padding: '0.55rem 1.25rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '0.375rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  Log In to Sign Documents
                </a>
              </div>
            ) : (
              <form onSubmit={handleSignDocument}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    1. Upload Document File (PDF, Image, Doc, etc.):
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSignFile(e.target.files[0])}
                    style={{ display: 'block', width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', backgroundColor: '#f8fafc' }}
                  />
                  {signFile && (
                    <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, marginTop: '0.25rem', display: 'block' }}>
                      Selected File: {signFile.name} ({(signFile.size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    2. Select RSA Private Key to Sign With:
                  </label>
                  {userState.keys.length > 0 ? (
                    <select
                      value={selectedKeyId}
                      onChange={(e) => setSelectedKeyId(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      {userState.keys.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.key_name} (Created {k.created_at})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.375rem', color: '#991b1b', fontSize: '0.85rem' }}>
                      No saved keypairs found. Please go to the <strong>Key Vault</strong> tab to generate an RSA keypair first!
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={signing || (!selectedKeyId && !customPrivKey)}
                  style={{ padding: '0.65rem 1.5rem', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '0.375rem', fontWeight: 700, fontSize: '0.95rem', cursor: signing ? 'not-allowed' : 'pointer' }}
                >
                  {signing ? 'Signing Document...' : '🔏 Generate Digital Signature'}
                </button>
              </form>
            )}

            {/* Signing Output Card */}
            {signResult && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#166534', fontSize: '1.1rem' }}>✅ Document Signed Successfully</h3>
                  <span style={{ fontSize: '0.8rem', backgroundColor: '#dcfce7', color: '#14532d', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>
                    SHA256withRSA
                  </span>
                </div>

                <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#14532d' }}>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>File Name:</strong> {signResult.filename}</p>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>Key Used:</strong> {signResult.key_name}</p>
                  <p style={{ margin: '0 0 0.25rem 0', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    <strong>SHA-256 Digest:</strong> {signResult.sha256}
                  </p>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>BASE64 DIGITAL SIGNATURE:</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => copyToClipboard(signResult.signature, 'Digital Signature')} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                        Copy Signature
                      </button>
                      <button onClick={() => downloadFile(`${signResult.filename}.sig`, signResult.signature)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                        Download .sig
                      </button>
                      <button
                        onClick={() =>
                          downloadFile(
                            `${signResult.filename}_signature_bundle.json`,
                            JSON.stringify(
                              {
                                filename: signResult.filename,
                                sha256_hash: signResult.sha256,
                                signature_b64: signResult.signature,
                                public_key_pem: signResult.public_key
                              },
                              null,
                              2
                            )
                          )
                        }
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #16a34a', borderRadius: '0.25rem', backgroundColor: '#16a34a', color: '#ffffff', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Download Verification Bundle (.json)
                      </button>
                    </div>
                  </div>
                  <textarea
                    readOnly
                    rows={4}
                    value={signResult.signature}
                    style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.78rem', backgroundColor: '#0f172a', color: '#4ade80', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.375rem', border: '1px solid #dcfce7', fontSize: '0.85rem', color: '#166534' }}>
                  💡 <strong>Tip for Verifier:</strong> Send the original <code>{signResult.filename}</code> along with either the signature string or the downloaded <code>.json</code> bundle to the <strong>Verify Signature</strong> tab to prove document authenticity!
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERIFY DOCUMENT SIGNATURE */}
        {activeTab === 'verify' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', color: '#0f172a' }}>🔍 Verify Document Signature & Integrity</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Upload any document file along with its signature and the signer's public key to verify that the document has not been altered or tampered with.
            </p>

            <form onSubmit={handleVerifyDocument}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  1. Upload Original Document File (PDF, Image, Doc, etc.):
                </label>
                <input
                  type="file"
                  onChange={(e) => setVerifyFile(e.target.files[0])}
                  style={{ display: 'block', width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', backgroundColor: '#f8fafc' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  2. Upload Signature File (.sig / .json) OR Paste Base64 Signature:
                </label>
                <input
                  type="file"
                  accept=".sig,.json,.txt"
                  onChange={handleSigFileUpload}
                  style={{ display: 'block', width: '100%', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', backgroundColor: '#f8fafc', marginBottom: '0.5rem', fontSize: '0.85rem' }}
                />
                <textarea
                  rows={3}
                  placeholder="Paste Base64 signature string..."
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
                    3. Signer's Public Key (PEM format):
                  </label>
                  {userState.authenticated && userState.keys.length > 0 && (
                    <select
                      onChange={(e) => {
                        const found = userState.keys.find((k) => k.id.toString() === e.target.value);
                        if (found) setPublicKeyText(found.public_key);
                      }}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                    >
                      <option value="">-- Load from my saved public keys --</option>
                      {userState.keys.map((k) => (
                        <option key={k.id} value={k.id}>{k.key_name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <textarea
                  rows={4}
                  placeholder="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
                  value={publicKeyText}
                  onChange={(e) => setPublicKeyText(e.target.value)}
                  style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.78rem', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                style={{ padding: '0.65rem 1.5rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '0.375rem', fontWeight: 700, fontSize: '0.95rem', cursor: verifying ? 'not-allowed' : 'pointer' }}
              >
                {verifying ? 'Verifying Signature...' : '🔍 Verify Document Authenticity'}
              </button>
            </form>

            {/* Verification Result Banner */}
            {verifyResult && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: verifyResult.verified ? '#f0fdf4' : '#fef2f2', border: verifyResult.verified ? '1px solid #bbf7d0' : '1px solid #fca5a5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{verifyResult.verified ? '✅' : '❌'}</span>
                  <h3 style={{ margin: 0, color: verifyResult.verified ? '#166534' : '#991b1b', fontSize: '1.2rem' }}>
                    {verifyResult.verified ? 'SIGNATURE VERIFIED - VALID' : 'VERIFICATION FAILED - INVALID'}
                  </h3>
                </div>

                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: verifyResult.verified ? '#15803d' : '#b91c1c', fontSize: '0.95rem' }}>
                  {verifyResult.message}
                </p>

                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#475569', fontFamily: 'monospace', backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', wordBreak: 'break-all' }}>
                  <div><strong>Document:</strong> {verifyResult.filename}</div>
                  <div><strong>Computed SHA-256:</strong> {verifyResult.sha256}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KEY VAULT & GENERATOR */}
        {activeTab === 'vault' && (
          <div>
            {/* RSA Keypair Generator Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.25rem', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⚡ Generate RSA Keypair</span>
              </h2>

              {!userState.authenticated ? (
                <div style={{ padding: '1.25rem', backgroundColor: '#fffbebfb', border: '1px solid #fef08a', borderRadius: '0.5rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#854d0e', fontSize: '0.95rem' }}>
                      🔒 Login Required to Generate Private Keys
                    </p>
                    <p style={{ margin: 0, color: '#a16207', fontSize: '0.85rem' }}>
                      You must be logged in to generate and store RSA private keypairs securely in your vault.
                    </p>
                  </div>
                  <a href="/login/?next=/DigitalSignature/" style={{ padding: '0.55rem 1.25rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '0.375rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                    Log In to Generate Keys
                  </a>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Generated RSA keypairs will be automatically linked and saved to your account.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Key Label (e.g. Official Signer Key 2026)"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                      style={{ flex: 1, minWidth: '240px', padding: '0.6rem 0.8rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                    <button
                      onClick={handleGenerateKeys}
                      disabled={loadingKeys}
                      style={{ padding: '0.6rem 1.25rem', backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: loadingKeys ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}
                    >
                      {loadingKeys ? 'Generating RSA-2048...' : 'Generate & Save Keypair'}
                    </button>
                  </div>
                </>
              )}

              {/* Newly Generated Keys Output */}
              {generatedKeyResult && (
                <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 700, color: '#334155', fontSize: '1rem' }}>
                      Generated Key: {generatedKeyResult.key_name}
                    </span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>
                      Saved to Account
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>PUBLIC KEY:</label>
                    <pre style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.78rem', overflowX: 'auto', margin: 0 }}>
                      {generatedKeyResult.public_key}
                    </pre>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b91c1c' }}>PRIVATE KEY:</label>
                      <button onClick={() => setShowGenPrivateKey(!showGenPrivateKey)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', border: '1px solid #fca5a5', borderRadius: '0.25rem', backgroundColor: '#fef2f2', color: '#991b1b', cursor: 'pointer', fontWeight: 600 }}>
                        {showGenPrivateKey ? 'Hide' : 'Reveal Private Key'}
                      </button>
                    </div>
                    {showGenPrivateKey ? (
                      <pre style={{ backgroundColor: '#0f172a', color: '#f43f5e', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.78rem', overflowX: 'auto', margin: 0 }}>
                        {generatedKeyResult.private_key}
                      </pre>
                    ) : (
                      <div style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        •••••••••••••••• PRIVATE KEY HIDDEN FOR SECURITY ••••••••••••••••
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Stored Keys Vault List */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
                  🔑 My Account Key Vault ({userState.keys.length})
                </h2>
                {userState.authenticated && (
                  <button onClick={fetchUserKeys} style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    🔄 Refresh Vault
                  </button>
                )}
              </div>

              {!userState.authenticated ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1' }}>
                  <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                    Account Authentication Required
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
                    Log in to access your stored RSA private keypairs, manage key history, and copy or download keys whenever needed.
                  </p>
                  <a href="/login/?next=/DigitalSignature/" style={{ display: 'inline-block', padding: '0.6rem 1.5rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '0.375rem', fontWeight: 600, textDecoration: 'none' }}>
                    Log in to View Saved Keys
                  </a>
                </div>
              ) : userState.keys.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                  <p style={{ color: '#64748b', margin: 0 }}>No saved keys in your vault yet. Generate a keypair above to save it to your account!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {userState.keys.map((k) => {
                    const isVisible = visibleKeyIds[k.id];
                    return (
                      <div key={k.id} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.25rem', backgroundColor: '#fafafa' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <div>
                            <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e293b', fontSize: '1rem' }}>{k.key_name}</h4>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Created on: {k.created_at}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteKey(k.id)}
                            style={{ padding: '0.3rem 0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '0.25rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Delete Key
                          </button>
                        </div>

                        {/* Public Key Display */}
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>PUBLIC KEY:</span>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => copyToClipboard(k.public_key, 'Public Key')} style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #cbd5e1', borderRadius: '0.2rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                                Copy
                              </button>
                              <button onClick={() => downloadFile(`${k.key_name.replace(/\s+/g, '_')}_pub.pub`, k.public_key)} style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #cbd5e1', borderRadius: '0.2rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                                Download
                              </button>
                            </div>
                          </div>
                          <pre style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', overflowX: 'auto', margin: 0 }}>
                            {k.public_key}
                          </pre>
                        </div>

                        {/* Private Key Display */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>PRIVATE KEY:</span>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => setVisibleKeyIds((prev) => ({ ...prev, [k.id]: !prev[k.id] }))} style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #fca5a5', borderRadius: '0.2rem', backgroundColor: '#fef2f2', color: '#991b1b', cursor: 'pointer', fontWeight: 600 }}>
                                {isVisible ? 'Hide' : 'Reveal Private Key'}
                              </button>
                              <button onClick={() => copyToClipboard(k.private_key, 'Private Key')} style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #cbd5e1', borderRadius: '0.2rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                                Copy
                              </button>
                              <button onClick={() => downloadFile(`${k.key_name.replace(/\s+/g, '_')}_priv.pem`, k.private_key)} style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #cbd5e1', borderRadius: '0.2rem', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                                Download
                              </button>
                            </div>
                          </div>
                          {isVisible ? (
                            <pre style={{ backgroundColor: '#1e293b', color: '#fb7185', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', overflowX: 'auto', margin: 0 }}>
                              {k.private_key}
                            </pre>
                          ) : (
                            <div style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontStyle: 'italic' }}>
                              •••••••••••••••• PRIVATE KEY HIDDEN FOR SECURITY ••••••••••••••••
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: QUICK TEXT HASH TOOL */}
        {activeTab === 'hash' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', color: '#0f172a' }}>✍️ Text & String Hash Calculator</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
              Calculate cryptographic MD5 / SHA digests for quick string verification.
            </p>
            <form onSubmit={handleGenerateHash}>
              <input
                type="text"
                placeholder="Enter text string..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', marginBottom: '1rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.9rem' }}
              />
              <button type="submit" style={{ padding: '0.6rem 1.25rem', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                Generate Digest Hash
              </button>
            </form>

            {hashResult && (
              <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.375rem', border: '1px solid #bae6fd' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: '#0369a1', fontSize: '0.875rem' }}>Calculated MD5 Digest:</p>
                <p style={{ fontFamily: 'monospace', color: '#0c4a6e', wordBreak: 'break-all', margin: 0, fontSize: '0.9rem' }}>{hashResult.text}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
