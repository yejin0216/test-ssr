import React, { useState, useEffect } from 'react';
import Home from './Home';
import About from './About';
import styled from 'styled-components';
import Icon from './icon.png';

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

const App = ({ initPage }) => {
  const [page, setPage] = useState(initPage);

  useEffect(() => {
    window.onpopstate = event => setPage(event.state); // 브라우저에서 뒤로가기 버튼을 클릭하면 onpopstate 함수가 호출된다.
  }, []);

  const onChangePage = event => {
    const newPage = event.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`); // pushState 메서드로 브라우저에게 주소가 변경됐다는 것을 알린다.
    setPage(newPage);
  };

  const PageComponent = page === 'home' ? Home : About;

  return (
    <Container>
      <button data-page='home' onClick={onChangePage}>
        Home
      </button>
      <button data-page='about' onClick={onChangePage}>
        About
      </button>
      <PageComponent />
      <img src={Icon} />
    </Container>
  );
};

export default App;
