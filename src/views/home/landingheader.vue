<template>

    <body>
        <section>
        <div id="content" class="relative h-96 flex flex-col justify-center text-center overflow-hidden font-inter antialiased">
        <div class="absolute top-0 flex left-24 z-20 drop-shadow-md text-white">
            <h1 class="text-6xl">Welcome to Itiner-easy!</h1>
        </div>
        <div class="w-full mt-20 max-w-6xl grid grid-cols-1 md:grid-cols-3 mx-auto px-4 md:px-6 py-24">
            <div class="image items-center md:col-span-1">
                <img src="../../assets/landingheader/journey.svg">
            </div>
            <div class="text-center relative flex flex-col justify-center md:col-span-2">
                    <div class="absolute top-13 bottom-96 left-36 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
                    <div class="absolute top-20 bottom-48 left-48 w-24 h-24 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>
                    <div class="absolute top-20 bottom-96 left-72 w-24 h-24 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
                <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-slate-800">Want to go to anywhere in 
                    <span class="text-indigo-600 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                        <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Asia<span class="text-black">?</span></li>
                            <li>Africa <span class="text-black">?</span></li>
                            <li>America <span class="text-black">?</span></li>
                            <li>Europe <span class="text-black">?</span></li>
                            <li>Oceania <span class="text-black">?</span></li>
                            <li aria-hidden="true">Asia</li>
                        </ul>
                    </span>
                </div>
                <div class="text-3xl mt-10">
                    <h2>We got you.</h2>
                </div>
            </div>
        </div>
    </div>
    </section> 
    </body>
</template>

<style scoped>
body{
    margin:0;
    padding:0;
}

@media (min-width: 768px) {
    section{
    position:relative;
    width:100%;
    height:80vh;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
}

section:before{
    content:'';
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:80%;
    background: linear-gradient(180deg,#bfdbfe,#bae6fd,#bfdbfe);
    border-radius: 0 0 50% 70%/0 0 100% 100%;
    transform:scaleX(1.5);
    transform:rotateX('30deg')
}
}



#content{
    position:relative;
    z-index:1;
    margin: 0 auto;
    max-width: 900px;
    text-align: center;
    bottom:30px
}

@media (max-width: 768px) {
    section{
    position:relative;
    width:100%;
    height:fit-content;
    display:flex;
    background: linear-gradient(180deg,#bfdbfe,#bae6fd,#bfdbfe);
    border-radius: 0 0 0 0/0 0 0 0;

}
    section:before{
    content:'';
    position:absolute;
}
}
</style>