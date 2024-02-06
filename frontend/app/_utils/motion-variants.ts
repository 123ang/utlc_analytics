export const FadeUpVarient = {
    start: {
        opacity: 0,
        y: '5rem'
    },
    end: {
        opacity: 1,
        y: 0,
        transition:{
            duration: .5,
            ease: [.9, 0, .1, 1],
            delayChildren: .25,
            staggerChildren: .25,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition:{
            duration: .75,
            ease: [.9, 0, .1, 1],
        },
    }
}

export const ZoomIn = {
    start: {
        opacity: 0,
        scale: 0.5,
    },
    end: {
        opacity: 1,
        scale: 1,
        transition:{
            duration: 1,
            ease: [.9, 0, .1, 1],
        },
    },
    exit: {
        opacity: 0,
        y: '100rem',
        transition:{
            duration: .75,
            ease: [.9, 0, .1, 1],
        },
    }
}

export const LoginTextExit = {
    exitTop: {
        opacity: 0,
        y: '-100rem',
        transition:{
            duration: .75,
            ease: [.9, 0, .1, 1],
        },
    },
    exitBottom: {
        opacity: 0,
        y: '100rem',
        transition:{
            duration: .75,
            ease: [.9, 0, .1, 1],
        },
    }
}

export const FadeOut = {
    exit: {
        opacity: 0,
        transition:{
            delay: .25,
            duration: .5,
            ease: [.9, 0, .1, 1],
        },
    }
}

export const NavFadeUpVarient = {    
    start: {
        opacity: 0,
        height: 0
    },
    end: {
        opacity: 1,
        height: '100%',
        transition:{     
            delay:.35,       
            duration: .5,
            ease: [.9, 0, .1, 1],
            delayChildren: .25,
            staggerChildren: .25,
        },
    },
}

export const NavHover = {
    start: {
        opacity: .25,
        width: 0,
    },
    end: {
        opacity: .25,
        width: 0,
    },
    hover: {
        opacity: .25,
        width: "100%",
        transition: {
            duration: .3,
            ease: [.9, 0, .1, 1],
        }
    },
}

export const CardContainerVarient = {    
    start: {
        opacity: 0,
        y: '5rem'
    },
    end: {
        opacity: 1,
        y: 0,
        transition:{
            delay: .25,
            duration: .5,
            ease: [.9, 0, .1, 1],
            delayChildren: .25,
            staggerChildren: .25,
        },
    },
    exit: {
        opacity: 0,
        y: '5rem',
        transition:{
            duration: .5,
            ease: [.9, 0, .1, 1],
        },
    }
}

export const TableColumnVariant = {    
    start: {
        opacity: 0,
        y: '5rem'
    },
    end: {
        opacity: 1,
        y: 0,
        transition:{
            duration: .5,
            ease: [.9, 0, .1, 1],
            delayChildren: .25,
            staggerChildren: .25,
        },
    },
    exit: {
        opacity: 0,
        y: '5rem',
        transition:{
            duration: .5,
            ease: [.9, 0, .1, 1],
        },
    },
    hover: {
        backgroundColor: '#acaca0',
        color: '#151515',
        transition:{
            duration: .3,
            ease: [.9, 0, .1, 1],
        },
    }
}

