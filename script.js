async function loadAlbumCovers() {
  try {
    const response = await fetch("songs.json");
    const data = await response.json();

    const container = document.getElementById("albumContainer");

    data.songs.forEach((song) => {
      const albumCover = document.createElement("img");

      albumCover.src = `images/${song.id}.jpg`;
      albumCover.className = "album-cover";

      albumCover.style.top = song.position.top;
      albumCover.style.left = song.position.left;

      albumCover.addEventListener("click", () => {
        // 모바일에서 유튜브 앱으로 연결
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
          // 모바일: 같은 탭에서 열기 (유튜브 앱이 자동으로 열림)
          window.location.href = song.youtubeURL;
        } else {
          // 데스크톱: 새 탭에서 열기
          window.open(song.youtubeURL, "_blank");
        }
      });

      container.appendChild(albumCover);
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", loadAlbumCovers);
