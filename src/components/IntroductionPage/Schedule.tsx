import styled from "styled-components"

function Schedule({title = '앞으로의 여정', children = '내용을 입력해주세요! (이름과 앞으로의 일정 등 소개 예정)'}) {
  return (
    <>
      <Heading>{title}</Heading>
      <Text>{children}</Text>
    </>
  )
}

export default Schedule

const Heading = styled.h2`
    font-size: 2.75rem;
    font-weight: 600;
    padding: 3.125rem 0;
    border-top: 2px solid #000;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 2.5rem;
      padding: 2.5rem 0;
    }
    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.5rem;
      padding: 1.875rem 0;
    }
`

const Text = styled.p`
  font-size: 2rem;
  margin-bottom: 3.125rem;
  line-height: 180%;

  @media ${(props) => props.theme.device.tablet} {     
    font-size: 1.75rem;
    margin-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
    margin-bottom: 1.875rem;
  }
`;