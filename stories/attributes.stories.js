import { storiesOf } from '@storybook/html'

storiesOf('attributes', module)
  .add(
    'data-zoom-src',
    () => `
      <img
        src="image-1.thumbnail.jpg"
        data-zoom-src="image-1.jpg"
      >

      <script>
        const zoom = mediumZoom('img');
      </script>
  `,
    {
      notes: {
        markdown: `Zoom on an image having a \`data-zoom-src\` attribute.`,
      },
    }
  )
  .add(
    'data-zoom-src with different aspect ratio',
    () => `
      <img
        src="image-3.thumbnail-square.jpg"
        data-zoom-src="image-3.jpg"
      >

      <script>
        const zoom = mediumZoom('img');
      </script>
  `,
    {
      notes: {
        markdown: `Zoom on an image having a \`data-zoom-src\` attribute with a different aspect ratio.`,
      },
    }
  )
  .add(
    'srcset',
    () => `
    <img
      srcset="
        image-1x300.jpg 300w,
        image-1x600.jpg 600w,
        image-1x800.jpg 800w,
        image-1x1000.jpg 1000w,
        image-1x1200.jpg 1200w
      "
    >

    <script>
      const zoom = mediumZoom('img');
    </script>
`,
    {
      notes: {
        markdown: `
Zoom on an image having \`srcset\` attributes.
    `,
      },
    }
  )
  .add(
    'srcset and data-zoom-src',
    () => `
    <img
      src="image-1x300.jpg"
      srcset="
        image-1x300.jpg 300w,
        image-1x600.jpg 600w,
      "
      sizes="(max-width: 400px) 100vw, 400px"
      data-zoom-src="image-1.jpg"
    >

    <script>
      const zoom = mediumZoom('img');
    </script>
`,
    {
      notes: `Zoom with srcset and data-zoom-src defined (zoom-target wins).`,
    }
  )
  .add(
    'SVG',
    () => `
      <img src="crab.svg">

      <script>
        const zoom = mediumZoom('img');
      </script>
    `,
    {
      notes: `
        Zoom on a SVG.
        The image fills the entire container.

        <em>Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></em>
      `,
    }
  )
