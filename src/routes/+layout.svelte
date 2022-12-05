<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.postcss';

	$: darkMode = false;
	$: showNav = false;

	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			darkMode = true;
			localStorage.setItem('darkMode', 'true');
		} else {
			darkMode = false;
			localStorage.setItem('darkMode', 'false');
		}
	})
</script>

<nav class="{ darkMode ? 'dark-mode' : 'light-mode' } { showNav ? 'nav-visible' : '' }">
	<div class="nav-body">
		<div class="links">
			<a href="/services" on:click={() => showNav = false}>Services</a>
			<!-- <a href="/testimonials">Testimonials</a> -->
			<a href="/blog" on:click={() => showNav = false}>Blog</a>
			<!-- <a href="/academy">Academy</a> -->
		</div>
		<a id="get-in-touch" href="/contact">Get in Touch</a>
		<div class="sm-links">
			<a href="https://www.linkedin.com/company/scalewhaleagency/" target="_blank">
				<img src="/images/sm-icons/lnkdn.svg" alt="LinkedIn Icon">
			</a>
			<a href="https://www.instagram.com">
				<img src="/images/sm-icons/inst.svg" alt="Instagram Icon">
			</a>
			<a href="https://www.discord.com">
				<img src="/images/sm-icons/dsc.svg" alt="Discord Icon">
			</a>
			<a href="https://www.twitter.com">
				<img src="/images/sm-icons/tw.svg" alt="Twitter Icon">
			</a>
		</div>
	</div>
</nav>
<header
	class="{ darkMode ? 'dark-mode' : 'light-mode' }"
>
	<div class="header">
		<a href="/" id="icon" on:click={() => showNav = false}>
			<img src="/images/icon.svg" alt="Scalewhale Blue Icon">
		</a>
		<div class="controls">
			<div id="toggle"
				on:click={() => {
					darkMode = !darkMode;
					localStorage.setItem('darkMode', darkMode);
					}
				}
			>
				<img src="/images/sun.svg" alt="Sun Icon">
				<img src="/images/moon.svg" alt="Moon Icon">
				<div id="circle"
					style="transform: {darkMode ? 'translateX(0px)' : 'translateX(46px)'}"
				></div>
			</div>
			<div id="menu"
				class="{showNav ? "active" : ""}"
				on:click={() => showNav = !showNav}
			>
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</header>
<main 
	class="{ darkMode ? 'dark-mode' : 'light-mode' }"
>
	<slot />
</main>

<style lang=scss></style>