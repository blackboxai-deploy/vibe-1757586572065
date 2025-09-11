"use client";

import { useState, useCallback } from "react";
import { AudioFile, ProcessingStatus } from "@/types/audio";
import FileUpload from "@/components/FileUpload";
import ProcessingStatusComponent from "@/components/ProcessingStatus";
import AudioPlayer from "@/components/AudioPlayer";
import DownloadInterface from "@/components/DownloadInterface";
import HistorySidebar from "@/components/HistorySidebar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<AudioFile | null>(null);


  const handleFileSelect = useCallback((newFiles: File[]) => {
    // Handle file selection - will implement upload logic
    console.log("Files selected:", newFiles);
  }, []);

  const handleUploadComplete = useCallback((file: AudioFile) => {
    setFiles(prev => [...prev, file]);
    setSelectedFile(file);
  }, []);

  const handleUploadError = useCallback((error: string) => {
    console.error("Upload error:", error);
    // Will implement toast notification
  }, []);

  const handleRetry = useCallback((fileId: string) => {
    // Implement retry logic
    console.log("Retrying file:", fileId);
  }, []);

  const handleCancel = useCallback((fileId: string) => {
    // Implement cancel logic
    console.log("Cancelling file:", fileId);
  }, []);

  const handleDownload = useCallback((fileId: string, trackType: 'vocals' | 'music' | 'original') => {
    // Implement download logic
    console.log("Downloading:", fileId, trackType);
  }, []);

  const handleFileDelete = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  }, [selectedFile]);

  const handleClearHistory = useCallback(() => {
    setFiles([]);
    setSelectedFile(null);
  }, []);

  const processingFiles = files.filter(f => [ProcessingStatus.UPLOADING, ProcessingStatus.QUEUED, ProcessingStatus.PROCESSING].includes(f.status));


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>AI-Powered Audio Separation Technology</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
          Separate Voice & Music
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Upload any audio or video file and let our advanced AI technology separate vocals and instrumental tracks 
          with professional quality. Download your tracks as high-quality MP4 files instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
          <Badge variant="outline" className="border-purple-500/30 text-purple-300">
            MP3, MP4, WAV, M4A supported
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-300">
            High-quality AI separation
          </Badge>
          <Badge variant="outline" className="border-green-500/30 text-green-300">
            Instant download
          </Badge>
          <Badge variant="outline" className="border-pink-500/30 text-pink-300">
            No registration required
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <HistorySidebar
            files={files}
            onFileSelect={setSelectedFile}
            onFileDelete={handleFileDelete}
            onClearHistory={handleClearHistory}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {/* Upload Section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span>Upload Your Audio or Video File</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                  maxFileSize={100 * 1024 * 1024} // 100MB
                  acceptedFormats={['.mp3', '.mp4', '.wav', '.m4a', '.avi', '.mov']}
                />
              </CardContent>
            </Card>

            {/* Processing Status */}
            {processingFiles.length > 0 && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <span>Processing Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProcessingStatusComponent
                    files={processingFiles}
                    onRetry={handleRetry}
                    onCancel={handleCancel}
                  />
                </CardContent>
              </Card>
            )}

            {/* File Details and Preview */}
            {selectedFile && selectedFile.status === ProcessingStatus.COMPLETED && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <span>Preview & Download</span>
                    </div>
                    <Badge variant="outline" className="border-green-500/30 text-green-300">
                      Completed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-400">Original File</p>
                      <p className="text-white font-medium truncate">{selectedFile.originalName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">File Size</p>
                      <p className="text-white font-medium">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-medium">{selectedFile.duration ? `${selectedFile.duration}s` : 'Unknown'}</p>
                    </div>
                  </div>

                  {/* Audio Players */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedFile.outputFiles?.original && (
                      <div>
                        <h4 className="text-white font-medium mb-3">Original Track</h4>
                        <AudioPlayer
                          src={selectedFile.outputFiles.original}
                          title="Original"
                          showDownload={true}
                        />
                      </div>
                    )}
                    {selectedFile.outputFiles?.vocals && (
                      <div>
                        <h4 className="text-white font-medium mb-3">Vocals Only</h4>
                        <AudioPlayer
                          src={selectedFile.outputFiles.vocals}
                          title="Vocals"
                          showDownload={true}
                        />
                      </div>
                    )}
                    {selectedFile.outputFiles?.music && (
                      <div>
                        <h4 className="text-white font-medium mb-3">Music Only</h4>
                        <AudioPlayer
                          src={selectedFile.outputFiles.music}
                          title="Music"
                          showDownload={true}
                        />
                      </div>
                    )}
                  </div>

                  {/* Download Interface */}
                  <DownloadInterface
                    file={selectedFile}
                    onDownload={handleDownload}
                  />
                </CardContent>
              </Card>
            )}

            {/* Features Overview */}
            {files.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">AI</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Advanced AI Technology</h3>
                    <p className="text-gray-400 text-sm">
                      Our state-of-the-art AI models provide superior separation quality with minimal artifacts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">⚡</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
                    <p className="text-gray-400 text-sm">
                      Process your files quickly with optimized algorithms and powerful cloud infrastructure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">🎵</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Multiple Formats</h3>
                    <p className="text-gray-400 text-sm">
                      Support for MP3, MP4, WAV, M4A and many other popular audio and video formats.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}