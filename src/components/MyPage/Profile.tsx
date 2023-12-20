import { useRef } from 'react';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '@/client';
import styled from 'styled-components';
import EditButton from '@components/Button/EditButton';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@store/getPbImageURL';

function Profile() {
  const {user} = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  
  const uploadFile = async () => {    
    const avatarFile = profileRef.current?.files?.[0];
    if (avatarFile ) {
      const { data, error } = await supabase
        .storage
        .from('profile')
        .upload(user, avatarFile, {
          contentType: 'image/*',
          upsert: true
        });

        if(!error) {
          toast.success('업로드 완료! (* 새로고침시 반영됩니다.)', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }

        if(error) return alert('storage 에러 발생');

      return data;
      
    }
    return null;
  }

  const handleSelectProfile = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const { data: imageUrl } = useQuery(['profileImageUrl', 'profile', user], () => getPbImageURL('profile', user));
  
  return (
    <>
      <Circle >
          <Image src={imageUrl} alt="profile" />
        <Input type="file" accept="image/*" ref={profileRef} onChange={uploadFile} />
        <EditButton onClick={handleSelectProfile} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      </Circle>
    </>
  );
}

export default Profile;

const Circle = styled.div`
  position: relative;
  min-width: 15rem;
  min-height: 15rem;
  border-radius: 50%;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    min-width: 11.25rem;
    min-height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-width: 7.5rem;
    min-height: 7.5rem;
  }
`;

const Image = styled.img`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: fill;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;

const Input = styled.input`
  display: none;
`