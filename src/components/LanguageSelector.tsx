'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, RotateCcw, Search, X } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '@/context/LanguageContext';

interface LanguageSelectorProps {
  mode?: 'header' | 'mobile' | 'footer';
  className?: string;
}

export default function LanguageSelector({ mode = 'header', className = '' }: LanguageSelectorProps) {
  const { currentLang, currentLanguage, setLanguage, isDefault, resetToEnglish, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredLanguages = LANGUAGES.filter((lang) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.englishName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code: string) => {
    setIsOpen(false);
    setSearchQuery('');
    setLanguage(code);
  };

  // --- FOOTER MODE ---
  if (mode === 'footer') {
    return (
      <div className={`lang-selector-footer ${className}`}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="lang-footer-btn"
          aria-label={t('changeLanguage')}
          aria-expanded={isOpen}
        >
          <Globe size={14} className="gold" />
          <span>
            {t('changeLanguage')}: <strong>{currentLanguage.flag} {currentLanguage.name}</strong>
          </span>
          <ChevronDown size={13} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
        </button>

        {isOpen && (
          <div ref={popoverRef} className="lang-popover lang-popover-upward" role="dialog" aria-modal="true">
            <div className="lang-popover-header">
              <div className="lang-popover-title">
                <Globe size={15} className="gold" />
                <span>{t('selectLanguage')}</span>
              </div>
              <button
                className="lang-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
            <div className="lang-notice-banner">
              <span className="lang-notice-pill">Default</span>
              <span>{t('defaultNotice')}</span>
            </div>
            <div className="lang-grid-list">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
                  onClick={() => handleSelect(lang.code)}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <div className="lang-labels">
                    <span className="lang-native-name">{lang.name}</span>
                    <span className="lang-sub-name">{lang.englishName}</span>
                  </div>
                  {lang.code === currentLang && <Check size={14} className="lang-check" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- MOBILE DRAWER MODE ---
  if (mode === 'mobile') {
    return (
      <div className={`lang-selector-mobile ${className}`}>
        <div className="lang-mobile-heading">
          <div className="lang-mobile-title">
            <Globe size={16} className="gold" />
            <span>{t('selectLanguage')}</span>
          </div>
          {!isDefault && (
            <button
              onClick={() => {
                resetToEnglish();
              }}
              className="lang-reset-link"
              title="Return to English"
            >
              <RotateCcw size={12} /> {t('resetToEnglish')}
            </button>
          )}
        </div>
        <p className="lang-mobile-sub">{t('defaultNotice')}</p>

        <div className="lang-mobile-grid">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                className={`lang-mobile-item ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(lang.code)}
                aria-pressed={isSelected}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-mobile-name">{lang.name}</span>
                {isSelected && <span className="lang-mobile-active-dot" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- DEFAULT DESKTOP HEADER MODE ---
  return (
    <div className={`lang-selector-container ${className}`}>
      <button
        ref={buttonRef}
        className={`lang-selector-btn ${isOpen ? 'open' : ''} ${!isDefault ? 'has-custom-lang' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`${t('selectLanguage')}: ${currentLanguage.name}`}
      >
        <Globe size={15} className="lang-globe-icon" />
        <span className="lang-code-text">
          <span className="lang-flag-small">{currentLanguage.flag}</span>
          <span className="lang-label-code">{currentLanguage.code.toUpperCase().split('-')[0]}</span>
        </span>
        <ChevronDown size={13} className={`lang-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="lang-popover"
          role="dialog"
          aria-label={t('selectLanguage')}
        >
          {/* Header */}
          <div className="lang-popover-header">
            <div className="lang-popover-title">
              <Globe size={16} className="gold" />
              <div>
                <strong>{t('selectLanguage')}</strong>
                <span className="lang-default-note">{t('defaultNotice')}</span>
              </div>
            </div>
            <button
              className="lang-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close language menu"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Search */}
          <div className="lang-search-box">
            <Search size={14} className="lang-search-icon" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lang-search-input"
              autoFocus
            />
            {searchQuery && (
              <button
                className="lang-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Language Options Grid */}
          <div className="lang-grid-list">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang: Language) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    className={`lang-option ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelect(lang.code)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <div className="lang-labels">
                      <span className="lang-native-name">{lang.name}</span>
                      <span className="lang-sub-name">{lang.englishName}</span>
                    </div>
                    {isSelected && <Check size={15} className="lang-check" />}
                  </button>
                );
              })
            ) : (
              <div className="lang-empty">No matching languages found</div>
            )}
          </div>

          {/* Popover Footer */}
          <div className="lang-popover-footer">
            {!isDefault ? (
              <button
                className="lang-reset-btn"
                onClick={() => {
                  setIsOpen(false);
                  resetToEnglish();
                }}
              >
                <RotateCcw size={13} />
                <span>{t('resetToEnglish')}</span>
              </button>
            ) : (
              <div className="lang-footer-hint">
                <span>✦ Private concierge support in English & islandwide languages</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Subtle floating badge shown when user is reading the website in a translated language
 */
export function ActiveLanguageFloatingPill() {
  const { currentLang, currentLanguage, isDefault, resetToEnglish, t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (isDefault || dismissed) return null;

  return (
    <aside
      className="lang-floating-pill notranslate"
      aria-label="Active translation notice"
      role="status"
    >
      <div className="lang-floating-inner">
        <span className="lang-pill-flag">{currentLanguage.flag}</span>
        <span className="lang-pill-text">
          {t('viewingIn')} <strong>{currentLanguage.name}</strong> ({currentLanguage.englishName})
        </span>
        <button
          className="lang-pill-revert"
          onClick={() => resetToEnglish()}
          title="Revert back to original English"
        >
          <RotateCcw size={12} />
          <span>English (Default)</span>
        </button>
        <button
          className="lang-pill-close"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss translation pill"
        >
          <X size={13} />
        </button>
      </div>
    </aside>
  );
}
