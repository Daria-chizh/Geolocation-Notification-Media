import FeedRenderer from './feedRenderer';
import RecordController from './recordController';

const feedRenderer = new FeedRenderer();
const recordController = new RecordController();

document.getElementById('inputText').addEventListener('keypress', (event) => {
  const inputElement = event.currentTarget;
  const inputText = inputElement.value;
  if (event.code !== 'Enter' || inputText === '') {
    return;
  }

  inputElement.value = '';
  event.preventDefault();

  const contentElement = document.createElement('div');
  contentElement.classList.add('textContent');
  contentElement.textContent = inputText;
  feedRenderer.addEntry(contentElement);
});

const audio = document.getElementById('microphone');
const popupWindow = document.querySelector('.popupWindow');

document.querySelector('.buttonCancelWindow').addEventListener('click', () => {
  popupWindow.classList.add('hidden');
});

audio.addEventListener('click', async () => {
  if (!window.MediaRecorder) {
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (err) {
    popupWindow.classList.remove('hidden');
    return;
  }

  const recorder = new MediaRecorder(stream);
  const chunks = [];
  let saveAudio = true;

  recordController.show(
    () => recorder.stop(),
    () => {
      saveAudio = false;
      recorder.stop();
    },
  );

  recorder.addEventListener('dataavailable', (evt) => {
    chunks.push(evt.data);
  });

  recorder.addEventListener('stop', () => {
    if (!saveAudio) {
      return;
    }

    const blob = new Blob(chunks);
    const audioContent = document.createElement('audio');
    audioContent.setAttribute('controls', 'true');
    audioContent.src = URL.createObjectURL(blob);
    feedRenderer.addEntry(audioContent);
  });

  recorder.start();
});

document.getElementById('camera').addEventListener('click', async () => {
  if (!window.MediaRecorder) {
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  } catch (err) {
    popupWindow.classList.remove('hidden');
    return;
  }

  const recorder = new MediaRecorder(stream);
  const chunks = [];
  let saveVideo = true;

  const currentVideo = document.createElement('video');
  currentVideo.classList.add('currentVideo');
  document.getElementById('feed').appendChild(currentVideo);
  currentVideo.setAttribute('autoplay', 'true');
  currentVideo.setAttribute('muted', '');
  currentVideo.srcObject = stream;

  recordController.show(
    () => {
      currentVideo.parentNode.removeChild(currentVideo);
      recorder.stop();
    },
    () => {
      saveVideo = false;
      currentVideo.parentNode.removeChild(currentVideo);
      recorder.stop();
    },
  );

  recorder.addEventListener('dataavailable', (evt) => {
    chunks.push(evt.data);
  });

  recorder.addEventListener('stop', () => {
    if (!saveVideo) {
      return;
    }

    const blob = new Blob(chunks);
    const videoContent = document.createElement('video');
    videoContent.setAttribute('controls', 'true');
    videoContent.src = URL.createObjectURL(blob);
    feedRenderer.addEntry(videoContent);
  });

  recorder.start();
});
