import { useState, useEffect } from 'react';
import { Author } from '../services/api';
import { apiService } from '../services/api';

interface AuthorSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (author: Author) => void;
  selectedAuthorId: string;
}

export default function AuthorSelector({
  isOpen,
  onClose,
  onSelect,
  selectedAuthorId,
}: AuthorSelectorProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAuthors();
    }
  }, [isOpen]);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to load authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.description.includes(searchTerm)
  );

  const handleSelect = (author: Author) => {
    onSelect(author);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center">
      <div className="bg-surface w-full md:w-[500px] md:max-h-[80vh] rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h3 className="text-title-md font-medium text-primary">选择作家</h3>
            <p className="text-xs md:text-label-md text-on-surface-variant mt-1">选择您喜欢的文学风格</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
        </div>
        
        <div className="p-4 md:px-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="搜索作家..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-body-md focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="p-4 md:px-6 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              <span className="ml-2 text-label-md text-on-surface-variant">加载中...</span>
            </div>
          ) : filteredAuthors.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-3">person_off</span>
              <p className="text-body-md text-on-surface-variant">没有找到匹配的作家</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAuthors.map((author) => (
                <div
                  key={author.id}
                  onClick={() => handleSelect(author)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:bg-surface-container-low ${
                    selectedAuthorId === author.id
                      ? 'border-primary bg-primary-container/20'
                      : 'border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedAuthorId === author.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'
                    }`}>
                      <span className="material-symbols-outlined text-2xl">person</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-label-md font-medium text-primary">{author.name}</h4>
                        <span className="text-xs text-on-surface-variant">{author.nameEn}</span>
                      </div>
                      <p className="text-xs md:text-label-md text-on-surface-variant mt-1 line-clamp-2">
                        {author.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {author.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-tertiary-fixed/50 text-xs rounded-full text-on-tertiary-fixed"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedAuthorId === author.id && (
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3 ml-15">
                    {author.characteristics.map((char) => (
                      <span
                        key={char}
                        className="px-2 py-0.5 bg-surface-container text-xs text-on-surface-variant rounded"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
