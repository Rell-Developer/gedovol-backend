const HeaderEmail = () => {
    return (
        `
            <style>
                .text-red{
                    color:red;
                }
                header{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    background-color: red;
                    height: 70px;
                    text-align: center;
                }
                header div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                header div h2{
                    margin-left: 10px;
                    margin-right: 10px;
                    color: white;
                    font-weight: bold;
                    font-size: 30px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }

                section{
                    margin-top:10px;
                }
            </style>
            <header class='w-full flex justify-center bg-color2 h-24 shadow text-center' style={{ height:"10vh"}}>
                <div class='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <h2 class='mx-2 text-white font-bold text-3xl lg:text-4xl'>
                        GEDOVOL
                    </h2>
                </div>
            </header>
        `
    )
}

export default HeaderEmail