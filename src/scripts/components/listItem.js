import styled from 'styled-components';

export default styled.li`
	cursor: pointer;
	color: #fff;
	padding: 1rem;
	box-shadow: 0 1px rgba(255,255,255,.15);
		&:first-of-type {
			box-shadow: 0 -1px rgba(255,255,255,.15),
								0 1px rgba(255,255,255,.15);
		}
`;