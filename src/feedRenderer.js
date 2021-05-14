import LocationGetter from './locationGetter';
import formatCurrentDate from './dateFormatter';

export default class FeedRenderer {
  constructor() {
    this.feedElement = document.getElementById('feed');
    this.feed = [];
    this.locationGetter = new LocationGetter();
  }

  render() {
    this.feedElement.replaceChildren();

    for (const { content, time, location } of this.feed) {
      const entryContainer = document.createElement('div');
      entryContainer.classList.add('feedEntry');

      const contentContainer = document.createElement('div');
      contentContainer.classList.add('feedEntryContent');
      contentContainer.appendChild(content);
      entryContainer.appendChild(contentContainer);

      const timeContainer = document.createElement('div');
      timeContainer.classList.add('feedEntryTime');
      timeContainer.textContent = time;
      entryContainer.appendChild(timeContainer);

      const locationContainer = document.createElement('div');
      locationContainer.classList.add('feedEntryLocation');
      locationContainer.textContent = location;
      entryContainer.appendChild(locationContainer);

      this.feedElement.appendChild(entryContainer);
    }
  }

  addEntry(content) {
    this.locationGetter.getLocation((location) => {
      this.feed.push({ content, time: formatCurrentDate(), location });
      this.render();
    });
  }
}
