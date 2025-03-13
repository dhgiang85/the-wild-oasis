import styled, {css} from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
      (props.type || "vertical") === "horizontal"
          ? css`
          align-items: center;
          justify-content: space-between;
        `
          : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`
// Row.defaultProps = {
//   type: "vertical",
// }
export default Row;