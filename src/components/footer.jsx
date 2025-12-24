/**
 * Footer component that displays the copyright information.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Footer = () => {
   return (
      <>
         <footer>
            <div>
               <p>© {new Date().getFullYear()}. All rights reserved.</p>
            </div>
         </footer>
      </>
   )
}