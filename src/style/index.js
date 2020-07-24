import styled from 'styled-components';

export const ItemWrapper = styled.div`
    font-size: 18px;
    margin: 10px auto;
    position: relative;

    textarea, div[contentEditable] {
        border: solid thin transparent;
        outline: none;
        resize: none;
        width: 100%;
        font-size: inherit;
        box-sizing: border-box;
        padding: 1rem;
        overflow-y: visible;
        &:focus,
        &:hover {
            box-sizing: border-box;
            border: thin solid #ccc;
        }&::selection {
            background: #eee;
        }
    }

    div.header {
        font-size: 30px;
        color: #898989;
    }
`

export const TopBarWrapper = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        display: inline-block;
        background: transparent;
        font-size: 18px;
        border: none;
        cursor: pointer;

        &:hover {
            color: rgb(0, 0, 225);
            outline: none;
        }
    }
`

export const AppWrapper = styled.div`
    width: 100%;
    margin: auto;
    box-sizing: border-box;
`

export const CodeBracket = styled.div`
    width: 100%;
    position: relative;
    color: white;
    height: auto;

    textarea {
        width: 100%;
    }

    div {
        color: white;
    }

    input.file {
        position: absolute;
        top: 0;
        right: 0;
        color: black;
        font-size: 10px;
        margin: 7px 7px auto auto;
        border: thin solid transparent;
        text-align: right;
        padding: 3px;
        &:focus {
            outline: none;
            border-color: #333;
        }
    }
`

export const ToolbarWrapper = styled.div`
    width: 100%;
    button {
        margin-right: 10px;
        padding: .6rem .8rem;
        border: none;
        background: #333;
        color: white;
        &:hover, &:focus {
            cursor: pointer;
            outline: none;
        }
        font-size: 18px;
    }

    button.del {
        float: right;
        background: red;
        margin-right: 20px;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;

    img {
        max-width: 100%;
        min-width: 300px;
        width: 60%;
        max-height: 500px;
        margin: auto;
    }

    .create-img {
        width: 100%;
        border: solid thin #ccc;
        background-color: white;
        padding: 32px;
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        input {
            width: 400px;
            max-width: calc(100% - 10px);
            margin: 8px auto;
            padding: 8px;
            display: block;
            background: transparent;
            border: thin solid #ddd;
            margin: 3px;
            &:focus {
                border: thin solid #ccc;
                outline: none;
            }
        }
        button {
            padding: 1.2rem 1.9rem;
            background: none;
            border: thin solid #ccc;
            margin: 1rem auto;
            &:hover, &:focus {
                cursor: pointer;
                outline: none;
            }
        }
    }
`

export const HomeWrapper = styled.div`

    padding: 1rem 1.2rem;
`

export const TitleWrapper = styled.div`
    position: relative:

    div.header {
        width: 100%;
    }

    div.placeholder {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        color: #ccc;
        font-size: 30px;
        padding-left: 1rem;
    }
`
