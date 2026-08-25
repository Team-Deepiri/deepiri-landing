import appleLogo from '../../assets/os/apple_logo.svg';
import linuxLogo from '../../assets/os/linux_logo.svg';
import windowsLogo from '../../assets/os/windows_logo.svg';

export type OsLogoKey = 'mac' | 'linux' | 'windows';

const OS_LOGOS: Record<OsLogoKey, string> = {
  mac: appleLogo,
  linux: linuxLogo,
  windows: windowsLogo,
};

function OsLogo({ os }: { os: OsLogoKey }) {
  return <img src={OS_LOGOS[os]} alt="" className="os-logo" draggable={false} />;
}

export default OsLogo;
