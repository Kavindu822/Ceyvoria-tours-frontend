import Link from 'next/link';
import Image from 'next/image';

export default function Brand({light=false}:{light?:boolean}){
  return (
    <Link className="brand notranslate" href="/" aria-label="CEYVORIA TOURS home" translate="no">
      <div className="brand-badge">
        <Image
          src="/brand/logo.png"
          alt="CEYVORIA TOURS · Sri Lanka"
          width={160}
          height={52}
          priority
          className="brand-logo-img"
        />
      </div>
    </Link>
  );
}

