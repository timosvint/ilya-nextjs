import { YouTubeEmbedProp } from "@/types/componentTypes/YouTubeEmbedType";





export const YouTubeEmbed = ({ id, title }: YouTubeEmbedProp) => {

    if (!id) return <p>PlaceHolder</p>
    
    const embedUrl = `https://www.youtube.com/embed/${id}`
          

        return (
    <div className="video-responsive mt-6 mb-8">
      <iframe
        width="100%"
        height="450" 
        src={embedUrl}
        title={`Трейлер к фильму ${title}`} 
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ aspectRatio: '16/9', width: '100%', height: 'auto', minHeight: '315px' }}
      ></iframe>
    </div>
  );

}