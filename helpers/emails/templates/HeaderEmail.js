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
                    <img src="/img/logo-blanco.png" alt="logo" class="w-1/6"/>
                    <h2 class='mx-2 text-white font-bold text-3xl lg:text-4xl'>
                        GEDOVOL
                    </h2>
                </div>
            </header>
        `
    )
}

export default HeaderEmail