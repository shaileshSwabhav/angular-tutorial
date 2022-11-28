import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voicedb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voicedb.component.html',
  styleUrls: ['./voicedb.component.scss'],
})
export class VoicedbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  pcmData!: Uint8Array
  analyserNode!: AnalyserNode
  audioInterval!: any
  audioStream!: MediaStream

  async calculateVoiceDb(): Promise<void> {
    try {
      console.log('calculateVoiceDb');
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
        },
      })
      console.log("audioStream -> ", this.audioStream);
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(this.audioStream);
      this.analyserNode = audioContext.createAnalyser();
      this.analyserNode.fftSize = 512;
      this.analyserNode.minDecibels = -127;
      this.analyserNode.maxDecibels = 0;
      this.analyserNode.smoothingTimeConstant = 0.4;

      mediaStreamSource.connect(this.analyserNode)
      this.pcmData = new Uint8Array(this.analyserNode.frequencyBinCount);

      this.audioInterval = setInterval(() => {
        this.onFrame()
      }, 100)

    } catch (error) {
      console.error(error);

    }
  }

  onFrame = () => {
    console.log("analyserNode -> ", this.analyserNode);

    this.analyserNode.getByteFrequencyData(this.pcmData);
    let sumSquares = 0.0;
    for (const amplitude of this.pcmData) {
      sumSquares += amplitude
    }
    const averageVolume = sumSquares / this.pcmData.length;

    console.log("averageVolume", sumSquares / this.pcmData.length);

    if (averageVolume == 0) {
      this.stopVoiceCheck()


      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(this.audioStream);
      this.analyserNode = audioContext.createAnalyser();
      this.analyserNode.fftSize = 512;
      this.analyserNode.minDecibels = -127;
      this.analyserNode.maxDecibels = 0;
      this.analyserNode.smoothingTimeConstant = 0.4;

      mediaStreamSource.connect(this.analyserNode)
      this.pcmData = new Uint8Array(this.analyserNode.fftSize);
    }

    document.getElementById('volumeMeter')?.setAttribute('value', (averageVolume * 100 / 127).toString());
    document.getElementById('volume-visualizer')?.style.setProperty('--volume', (averageVolume * 100 / 127) + '%');
    // window.requestAnimationFrame(this.onFrame);
  }


  startVoiceCheck(): void {
    console.log('startVoiceCheck');
    this.calculateVoiceDb()
  }

  stopVoiceCheck(): void {
    clearInterval(this.audioInterval)
  }
}