import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Search, Home, Compass, PlusSquare, User, Camera, Image, X, Settings, Video, Play } from 'lucide-react';

const LsSocialMedia = () => {
  const [currentView, setCurrentView] = useState('home');
  const [posts, setPosts] = useState([]);
  
  const [stories] = useState([
    { id: 1, username: 'Adicionar Story', avatar: null, isOwn: true },
    { id: 2, username: 'Stories aparecem aqui', avatar: null }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostImage, setNewPostImage] = useState('');
  const [newPostVideo, setNewPostVideo] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [postType, setPostType] = useState('image');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, saved: !post.saved } : post
    ));
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) return;
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, { username: 'usuario', text: comment }] }
        : post
    ));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (file.type.startsWith('video/')) {
          setNewPostVideo(e.target.result);
          setNewPostImage('');
          setPostType('video');
        } else {
          setNewPostImage(e.target.result);
          setNewPostVideo('');
          setPostType('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if ((!newPostImage && !newPostVideo) || !newPostCaption.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      username: 'usuario',
      timestamp: 'agora',
      image: postType === 'image' ? newPostImage : null,
      video: postType === 'video' ? newPostVideo : null,
      type: postType,
      caption: newPostCaption,
      likes: 0,
      comments: [],
      liked: false,
      saved: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostImage('');
    setNewPostVideo('');
    setNewPostCaption('');
    setPostType('image');
    setShowNewPost(false);
    setCurrentView('home');
  };

  const NavigationBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button onClick={() => setCurrentView('home')} className={`p-2 transition-colors ${currentView === 'home' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}>
          <Home size={24} />
        </button>
        <button onClick={() => setCurrentView('explore')} className={`p-2 transition-colors ${currentView === 'explore' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}>
          <Compass size={24} />
        </button>
        <button onClick={() => setShowNewPost(true)} className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
          <PlusSquare size={24} />
        </button>
        <button onClick={() => setCurrentView('profile')} className={`p-2 transition-colors ${currentView === 'profile' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}>
          <User size={24} />
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <div className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 px-4 py-3 z-10">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ls Social Midia
        </h1>
        <div className="flex items-center gap-3">
          <Heart size={24} className="text-gray-300 hover:text-red-400 transition-colors" />
          <MessageCircle size={24} className="text-gray-300 hover:text-blue-400 transition-colors" />
        </div>
      </div>
    </div>
  );

  const Story = ({ story }) => (
    <div className="flex flex-col items-center mr-4">
      <div className={`w-16 h-16 rounded-full p-0.5 ${story.isOwn ? 'bg-gray-600' : 'bg-gradient-to-tr from-purple-500 to-pink-500'} flex items-center justify-center`}>
        {story.avatar ? (
          <img src={story.avatar} alt={story.username} className="w-full h-full rounded-full border-2 border-white object-cover" />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-700 border-2 border-white flex items-center justify-center">
            {story.isOwn ? (
              <Camera size={20} className="text-gray-300" />
            ) : (
              <User size={20} className="text-gray-400" />
            )}
          </div>
        )}
        {story.isOwn && (
          <div className="absolute -mt-4 ml-11 bg-blue-500 rounded-full p-1">
            <Camera size={10} className="text-white" />
          </div>
        )}
      </div>
      <span className="text-xs mt-1 text-gray-300 text-center max-w-16 truncate">{story.username}</span>
    </div>
  );

  const Post = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 mb-4 border border-gray-700 rounded-xl mx-2 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full mr-3 bg-gray-600 border border-gray-500 flex items-center justify-center">
              <User size={16} className="text-gray-300" />
            </div>
            <div>
              <span className="font-semibold text-sm text-white">{post.username}</span>
              <span className="text-gray-400 text-xs ml-2">{post.timestamp}</span>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer" />
        </div>

        {post.type === 'video' ? (
          <video 
            src={post.video} 
            className="w-full h-80 object-cover bg-black"
            controls
            loop
            muted
            playsInline
          />
        ) : (
          <img src={post.image} alt="Post" className="w-full h-80 object-cover" />
        )}

        <div className="flex justify-between items-center p-4">
          <div className="flex gap-4">
            <button onClick={() => handleLike(post.id)} className="transition-transform hover:scale-110">
              <Heart size={24} className={post.liked ? 'text-red-500 fill-current' : 'text-gray-300 hover:text-red-400'} />
            </button>
            <button onClick={() => setShowComments(!showComments)} className="transition-transform hover:scale-110">
              <MessageCircle size={24} className="text-gray-300 hover:text-blue-400" />
            </button>
            <Send size={24} className="text-gray-300 hover:text-green-400 cursor-pointer transition-colors" />
          </div>
          <button onClick={() => handleSave(post.id)} className="transition-transform hover:scale-110">
            <Bookmark size={24} className={post.saved ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-400'} />
          </button>
        </div>

        <div className="px-4 pb-2">
          <span className="font-semibold text-sm text-white">{post.likes} curtidas</span>
        </div>

        <div className="px-4 pb-2">
          <span className="font-semibold text-sm mr-2 text-white">{post.username}</span>
          <span className="text-sm text-gray-300">{post.caption}</span>
        </div>

        {post.comments.length > 0 && (
          <div className="px-4 pb-2">
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-gray-400 text-sm hover:text-gray-200 transition-colors"
            >
              {showComments ? 'Ocultar' : `Ver todos os ${post.comments.length} comentários`}
            </button>
            
            {showComments && (
              <div className="mt-2 space-y-1">
                {post.comments.map((comment, index) => (
                  <div key={index}>
                    <span className="font-semibold text-sm mr-2 text-white">{comment.username}</span>
                    <span className="text-sm text-gray-300">{comment.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="px-4 pb-4 flex items-center border-t border-gray-700 pt-3 mt-2">
          <input
            type="text"
            placeholder="Adicione um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent text-white placeholder-gray-400"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleComment(post.id, commentText);
                setCommentText('');
              }
            }}
          />
          <button 
            onClick={() => {
              handleComment(post.id, commentText);
              setCommentText('');
            }}
            className="text-purple-400 hover:text-purple-300 font-semibold text-sm ml-2 transition-colors"
          >
            Publicar
          </button>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="pt-20 pb-20">
      <div className="flex overflow-x-auto p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 scrollbar-hide">
        {stories.map(story => (
          <Story key={story.id} story={story} />
        ))}
      </div>

      <div>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Camera size={64} className="text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Bem-vindo ao Ls Social Midia!</h3>
            <p className="text-gray-400 text-center mb-6">Comece criando sua primeira publicação</p>
            <button 
              onClick={() => setShowNewPost(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Criar Primeira Publicação
            </button>
          </div>
        ) : (
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );

  const ExploreView = () => (
    <div className="pt-20 pb-20 px-4">
      <div className="mb-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-xl outline-none border border-gray-600 focus:border-purple-400 transition-colors"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {Array.from({length: 9}, (_, i) => (
          <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform flex items-center justify-center">
            <Image size={32} className="text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="pt-20 pb-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-gray-700 border-2 border-purple-400 mr-4 flex items-center justify-center">
            <User size={32} className="text-gray-300" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-white">Seu Perfil</h2>
            <p className="text-gray-400">@usuario</p>
          </div>
        </div>
        <Settings size={24} className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer" />
      </div>
      
      <div className="flex justify-around mb-6 py-4 border-y border-gray-700">
        <div className="text-center">
          <div className="font-semibold text-lg text-white">{posts.filter(p => p.username === 'usuario').length}</div>
          <div className="text-gray-400 text-sm">Posts</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-white">0</div>
          <div className="text-gray-400 text-sm">Seguidores</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-white">0</div>
          <div className="text-gray-400 text-sm">Seguindo</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {posts.filter(p => p.username === 'usuario').length === 0 ? (
          <div className="col-span-3 flex flex-col items-center py-12">
            <div className="flex gap-4 mb-4">
              <Camera size={24} className="text-gray-500" />
              <Video size={24} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-center">Suas fotos e vídeos aparecerão aqui</p>
          </div>
        ) : (
          posts.filter(p => p.username === 'usuario').map((post, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform relative">
              {post.type === 'video' ? (
                <>
                  <video src={post.video} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded">
                    <Play size={12} />
                  </div>
                </>
              ) : (
                <img src={post.image} alt={`Post ${index}`} className="w-full h-full object-cover" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-600 rounded-xl w-full max-w-md max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <button onClick={() => setShowNewPost(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <h3 className="font-semibold text-white">Nova Publicação</h3>
          <button 
            onClick={handleCreatePost}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors disabled:text-gray-500"
            disabled={(!newPostImage && !newPostVideo) || !newPostCaption.trim()}
          >
            Compartilhar
          </button>
        </div>
        
        <div className="p-4 max-h-80 overflow-y-auto">
          {!newPostImage && !newPostVideo ? (
            <div className="text-center">
              <div className="flex justify-center mb-6 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setPostType('image')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    postType === 'image' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Image size={20} />
                  Foto
                </button>
                <button
                  onClick={() => setPostType('video')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    postType === 'video' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Video size={20} />
                  Vídeo Short
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4">
                {postType === 'image' ? (
                  <Image size={48} className="mx-auto mb-4 text-gray-400" />
                ) : (
                  <Video size={48} className="mx-auto mb-4 text-gray-400" />
                )}
                <p className="text-gray-300 mb-4">
                  {postType === 'image' 
                    ? 'Selecione uma foto para publicar' 
                    : 'Selecione um vídeo short (até 60s)'
                  }
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {postType === 'image' ? 'Escolher Foto' : 'Escolher Vídeo'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {postType === 'video' ? (
                <div className="relative">
                  <video 
                    src={newPostVideo} 
                    className="w-full h-40 object-cover rounded-lg border border-gray-600 bg-black"
                    controls
                    muted
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    📹 Vídeo Short
                  </div>
                </div>
              ) : (
                <img src={newPostImage} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-600" />
              )}
              
              <textarea
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                placeholder="Escreva uma legenda..."
                className="w-full h-20 p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg resize-none outline-none focus:border-purple-400 transition-colors"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                {postType === 'image' ? 'Alterar foto' : 'Alterar vídeo'}
              </button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept={postType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen">
      <Header />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'explore' && <ExploreView />}
      {currentView === 'profile' && <ProfileView />}
      
      {showNewPost && <NewPostModal />}
      
      <NavigationBar />
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LsSocialMedia;
